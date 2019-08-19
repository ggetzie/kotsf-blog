#! /usr/bin/env bash
# update the frontmatter
# move post from the draft to the publish folder

SLUG=$1

sed -i s/'path: "\/draft\/'${SLUG}'\/"'/'path: "\/'${SLUG}'\/"'/ draft/${SLUG}/index.md
sed -i s/'section: "draft"'/'section: "publish"'/ draft/${SLUG}/index.md
sed -i s/"^date: [0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}$"/"date: "`date -I`/ draft/${SLUG}/index.md

mv draft/${SLUG} publish/${SLUG}
