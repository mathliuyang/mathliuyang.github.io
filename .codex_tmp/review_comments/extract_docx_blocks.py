from __future__ import annotations

import argparse
import json
import zipfile
from pathlib import Path

from lxml import etree

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
M = "http://schemas.openxmlformats.org/officeDocument/2006/math"
NS = {"w": W, "m": M}


def qn(tag: str) -> str:
    return f"{{{W}}}{tag}"


def mn(tag: str) -> str:
    return f"{{{M}}}{tag}"


def math_linear(node: etree._Element) -> str:
    """Best-effort readable linearization of the small inline OMML formulas here."""
    if node.tag == mn("t"):
        return node.text or ""
    if node.tag == mn("f"):
        num = node.find("m:num", NS)
        den = node.find("m:den", NS)
        return f"({math_linear(num)})/({math_linear(den)})"
    if node.tag == mn("sSup"):
        base = node.find("m:e", NS)
        sup = node.find("m:sup", NS)
        return f"{math_linear(base)}^({math_linear(sup)})"
    if node.tag == mn("sSub"):
        base = node.find("m:e", NS)
        sub = node.find("m:sub", NS)
        return f"{math_linear(base)}_({math_linear(sub)})"
    if node.tag == mn("sSubSup"):
        base = node.find("m:e", NS)
        sub = node.find("m:sub", NS)
        sup = node.find("m:sup", NS)
        return f"{math_linear(base)}_({math_linear(sub)})^({math_linear(sup)})"
    if node.tag == mn("rad"):
        deg = node.find("m:deg", NS)
        expr = node.find("m:e", NS)
        d = math_linear(deg)
        return f"root[{d}]({math_linear(expr)})" if d else f"sqrt({math_linear(expr)})"
    if node.tag == mn("nary"):
        op = "∫"
        chr_el = node.find("m:naryPr/m:chr", NS)
        if chr_el is not None:
            op = chr_el.get(mn("val"), op)
        sub = node.find("m:sub", NS)
        sup = node.find("m:sup", NS)
        expr = node.find("m:e", NS)
        return f"{op}_({math_linear(sub)})^({math_linear(sup)}) {math_linear(expr)}"
    if node is None:
        return ""
    return "".join(math_linear(child) for child in node)


def paragraph_payload(p: etree._Element) -> dict:
    ppr = p.find(qn("pPr"))
    style = ""
    num_id = ""
    ilvl = ""
    if ppr is not None:
        pstyle = ppr.find(qn("pStyle"))
        if pstyle is not None:
            style = pstyle.get(qn("val"), "")
        numpr = ppr.find(qn("numPr"))
        if numpr is not None:
            nid = numpr.find(qn("numId"))
            lvl = numpr.find(qn("ilvl"))
            if nid is not None:
                num_id = nid.get(qn("val"), "")
            if lvl is not None:
                ilvl = lvl.get(qn("val"), "")

    visible_parts: list[str] = []
    deleted_parts: list[str] = []
    equations = []
    for omath in p.xpath(".//m:oMath", namespaces=NS):
        equations.append(math_linear(omath))
    embedded = []
    for node in p.iter():
        local = etree.QName(node).localname
        if local in {"drawing", "object", "pict"}:
            embedded.append(local)

    for node in p.iter():
        if node.tag == qn("t"):
            visible_parts.append(node.text or "")
        elif node.tag == mn("oMath"):
            visible_parts.append(f"[[MATH:{math_linear(node)}]]")
        elif node.tag == qn("tab"):
            visible_parts.append("\t")
        elif node.tag in (qn("br"), qn("cr")):
            visible_parts.append("\n")
        elif node.tag == qn("delText"):
            deleted_parts.append(node.text or "")

    return {
        "style": style,
        "num_id": num_id,
        "ilvl": ilvl,
        "text": "".join(visible_parts),
        "deleted_text": "".join(deleted_parts),
        "equations": equations,
        "embedded": embedded,
        "xml": etree.tostring(p, encoding="unicode") if equations or embedded else "",
    }


def iter_blocks(body: etree._Element):
    for child in body:
        if child.tag == qn("p"):
            yield {"kind": "paragraph", **paragraph_payload(child)}
        elif child.tag == qn("tbl"):
            rows = []
            for tr in child.findall("w:tr", NS):
                cells = []
                for tc in tr.findall("w:tc", NS):
                    paras = [paragraph_payload(p) for p in tc.findall("w:p", NS)]
                    cells.append(paras)
                rows.append(cells)
            yield {"kind": "table", "rows": rows}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("input_docx", type=Path)
    ap.add_argument("--json", dest="json_path", type=Path, required=True)
    ap.add_argument("--text", dest="text_path", type=Path, required=True)
    args = ap.parse_args()

    with zipfile.ZipFile(args.input_docx) as zf:
        document = etree.fromstring(zf.read("word/document.xml"))
        names = sorted(zf.namelist())
        body = document.find("w:body", NS)
        if body is None:
            raise RuntimeError("word/document.xml has no w:body")
        blocks = list(iter_blocks(body))
        package = {
            "has_comments": "word/comments.xml" in names,
            "has_numbering": "word/numbering.xml" in names,
            "has_footnotes": "word/footnotes.xml" in names,
            "has_endnotes": "word/endnotes.xml" in names,
            "header_parts": [n for n in names if n.startswith("word/header")],
            "footer_parts": [n for n in names if n.startswith("word/footer")],
            "media_parts": [n for n in names if n.startswith("word/media/")],
        }

    args.json_path.parent.mkdir(parents=True, exist_ok=True)
    args.json_path.write_text(
        json.dumps({"package": package, "blocks": blocks}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    lines = []
    for idx, block in enumerate(blocks, start=1):
        if block["kind"] == "paragraph":
            text = block["text"].replace("\n", "\\n")
            deleted = block["deleted_text"].replace("\n", "\\n")
            lines.append(
                f"P{idx:04d}\tstyle={block['style']}\tnum={block['num_id']}:{block['ilvl']}\t{text}"
            )
            if deleted:
                lines.append(f"P{idx:04d}\tDELETED\t{deleted}")
        else:
            lines.append(f"T{idx:04d}\trows={len(block['rows'])}")
            for r_idx, row in enumerate(block["rows"], start=1):
                values = []
                for cell in row:
                    values.append(" | ".join(p["text"].replace("\n", "\\n") for p in cell))
                lines.append(f"T{idx:04d}.R{r_idx:03d}\t" + " || ".join(values))
    args.text_path.write_text("\n".join(lines), encoding="utf-8")


if __name__ == "__main__":
    main()
