from __future__ import annotations

import argparse
import re
import zipfile
from pathlib import Path

from lxml import etree

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PR = "http://schemas.openxmlformats.org/package/2006/relationships"
V = "urn:schemas-microsoft-com:vml"
NS = {"w": W, "r": R, "pr": PR, "v": V}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("input_docx", type=Path)
    ap.add_argument("output_dir", type=Path)
    ap.add_argument("--blocks", default="18,24,33")
    args = ap.parse_args()
    wanted = {int(x) for x in args.blocks.split(",") if x.strip()}
    args.output_dir.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(args.input_docx) as zf:
        doc = etree.fromstring(zf.read("word/document.xml"))
        rels = etree.fromstring(zf.read("word/_rels/document.xml.rels"))
        relmap = {
            rel.get("Id"): rel.get("Target")
            for rel in rels.findall("pr:Relationship", NS)
        }
        body = doc.find("w:body", NS)
        block_no = 0
        for child in body:
            block_no += 1
            if block_no not in wanted or child.tag != f"{{{W}}}p":
                continue
            obj_no = 0
            for obj in child.findall(".//w:object", NS):
                obj_no += 1
                image = obj.find(".//v:imagedata", NS)
                shape = obj.find(".//v:shape", NS)
                if image is None:
                    continue
                rid = image.get(f"{{{R}}}id")
                target = relmap[rid]
                part = "word/" + target.lstrip("/")
                ext = Path(target).suffix or ".bin"
                out = args.output_dir / f"P{block_no:04d}_F{obj_no:02d}_{rid}{ext}"
                out.write_bytes(zf.read(part))
                style = shape.get("style", "") if shape is not None else ""
                width = re.search(r"width:([0-9.]+)pt", style)
                height = re.search(r"height:([0-9.]+)pt", style)
                dims = f"{width.group(1) if width else '?'}x{height.group(1) if height else '?'}pt"
                print(f"{out.name}\t{dims}\t{part}")


if __name__ == "__main__":
    main()
