import os
import re

from datetime import datetime

gd_date = re.compile(r"(?<=Originally published )\d{4}-\d{2}-\d{2}")

def convert_gdarchive():
    from_dir = "/usr/local/src/kotsf/text/publish/gdarchive"
    to_dir = "/usr/local/src/kotsf-blog/posts/gdarchive"
    for gdfile in os.listdir(from_dir):
        if os.path.isdir(gdfile): continue
        with open(os.path.join(from_dir, gdfile)) as infile:
            lines = infile.readlines()
            title = lines[0].replace("## ", "").strip()
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
        with open(os.path.join(to_dir, gdfile), "w") as outfile:
            outfile.write(frontmatter)
            outfile.write(txt)
    
def convert_publish():
    from_dir = "/usr/local/src/kotsf/text/publish"
    to_dir = "/usr/local/src/kotsf-blog/posts/publish"
    for postfile in os.listdir(from_dir):
        if os.path.isdir(postfile): continue
        with open(os.path.join(from_dir, postfile)) as infile:
            lines = infile.readlines()
            title = lines[0][3:].strip()
            pub_date = lines[1].strip()
            oldId = lines[2].strip()
            txt = "".join(lines[3:])
        frontmatter = f"""---
path: "/{postfile[:-3]}/"
date: {pub_date}
title: "{title}"
oldId: {oldId}
section: "publish"
---
"""
        with open(os.path.join(to_dir, postfile), "w") as outfile:
            outfile.write(frontmatter)
            outfile.write(txt)

def convert_drafts():
    from_dir = "/usr/local/src/kotsf/text/draft"
    to_dir = "/usr/local/src/kotsf-blog/posts/draft"

    for draft in os.listdir(from_dir):
        if os.path.isdir(draft): continue
        filename = os.path.join(from_dir, draft)
        with open(filename) as infile:
            lines = infile.readlines()
            title = lines[0][3:].strip()
            oldId = lines[1].strip()
            txt = "".join(lines[2:])
            timestamp = os.stat(filename).st_ctime
            filedate = datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")
        frontmatter = f"""---
path: "/draft/{draft[:-3]}/"
title: "{title}"
oldId: {oldId}
date: {filedate}
section: "draft"
---
"""
        with open(os.path.join(to_dir, draft), "w") as outfile:
            outfile.write(frontmatter)
            outfile.write(txt)
    
if __name__ == "__main__":
    convert_gdarchive()
    convert_publish()
    convert_drafts()