from __future__ import annotations

import argparse
import os
import zipfile
from pathlib import Path

from lxml import etree

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("docx", type=Path)
    ap.add_argument("--value", choices=("true", "false"), default="false")
    args = ap.parse_args()
    tmp = args.docx.with_suffix(args.docx.suffix + ".fieldtmp")
    with zipfile.ZipFile(args.docx, "r") as zin, zipfile.ZipFile(tmp, "w") as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "word/settings.xml":
                root = etree.fromstring(data)
                node = root.find(f"{{{W}}}updateFields")
                if node is None:
                    node = etree.SubElement(root, f"{{{W}}}updateFields")
                node.set(f"{{{W}}}val", args.value)
                data = etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone="yes")
            zout.writestr(item, data)
    os.replace(tmp, args.docx)
    print(f"Set w:updateFields={args.value} in {args.docx}")


if __name__ == "__main__":
    main()
