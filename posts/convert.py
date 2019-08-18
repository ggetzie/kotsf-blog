import os
import pathlib
import re

from datetime import datetime

gd_date = re.compile(r"(?<=Originally published )\d{4}-\d{2}-\d{2}")

def convert_gdarchive():
    from_dir = pathlib.Path("/usr/local/src/kotsf/text/publish/gdarchive")
    to_dir = pathlib.Path("/usr/local/src/kotsf-blog/posts/gdarchive")
    for gdfile in from_dir.glob("*.md"):
        with open(gdfile) as infile:
            lines = infile.readlines()
            title = re.sub(r'\#{1,2} ', '', lines[0]).strip()
            oldId = lines[1].strip()
            txt = "".join(lines[2:])
            m = gd_date.search(txt)
            date = m.group(0) if m else None
        frontmatter = f"""---
path: "/gdarchive/{oldId}"
title: "{title}"
oldId: {oldId}
date: {date}
section: "gdarchive"
---
""" 
        post_dir = to_dir / gdfile.stem
        post_dir.mkdir()
        with open(post_dir / "index.md", "w") as outfile:
            outfile.write(frontmatter)
            outfile.write(txt)
    
def convert_publish():
    from_dir = pathlib.Path("/usr/local/src/kotsf/text/publish")
    to_dir = pathlib.Path("/usr/local/src/kotsf-blog/posts/publish")
    for postfile in from_dir.glob("*.md"):
        with open(postfile, "r") as infile:
            lines = infile.readlines()
            title = re.sub(r'\#{1,2} ', '', lines[0]).strip()
            pub_date = lines[1].strip()
            oldId = lines[2].strip()
            txt = "".join(lines[3:])
        frontmatter = f"""---
path: "/{postfile.stem}/"
date: {pub_date}
title: "{title}"
oldId: {oldId}
section: "publish"
---
"""     
        post_dir = to_dir / postfile.stem
        post_dir.mkdir()
        with open( post_dir / "index.md", "w") as outfile:
            outfile.write(frontmatter)
            outfile.write(txt)

def convert_drafts():
    from_dir = pathlib.Path("/usr/local/src/kotsf/text/draft")
    to_dir = pathlib.Path("/usr/local/src/kotsf-blog/posts/draft")

    for draft in from_dir.glob("*.md"):
        with open(draft, "r") as infile:
            lines = infile.readlines()
            title = re.sub(r'\#{1,2} ', '', lines[0]).strip()
            oldId = lines[1].strip()
            txt = "".join(lines[2:])
            timestamp = os.stat(draft).st_ctime
            filedate = datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")
        frontmatter = f"""---
path: "/draft/{draft.stem}/"
title: "{title}"
oldId: {oldId}
date: {filedate}
section: "draft"
---
"""
        post_dir = to_dir / draft.stem
        post_dir.mkdir()
        with open(post_dir / "index.md" , "w") as outfile:
            outfile.write(frontmatter)
            outfile.write(txt)
    
if __name__ == "__main__":
    convert_gdarchive()
    convert_publish()
    convert_drafts()