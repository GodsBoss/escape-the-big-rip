#!/bin/sh

cp src/index.html dist
gimp-console -i -b "`cat src/gfx/export.scm`"
npm run-script build
