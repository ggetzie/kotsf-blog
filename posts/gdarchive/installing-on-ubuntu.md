---
path: "/gdarchive/38"
title: "Installing matplotlib in a virtrualenv on Ubuntu"
oldId: 38
date: 2012-09-22
section: "gdarchive"
---
Just a short note to document some missing dependencies for anyone else trying to google the same problem I just had.

This first time it failed it couldn't find a file called ft2build.h. This was fixed by installing libfreetype6 and libfreetype6-dev. 

After that it failed when it couldn't find png.h. This was fixed by installing libpng-dev

In summary, before running pip install run:

    sudo apt-get install libfreetype6 libfreetype6-dev libpng-dev

and it should go off without a hitch. I assume these would be needed installing outside a virtualenv as well.



*Originally published 2012-09-22 11:36:44*