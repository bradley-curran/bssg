#!/bin/sh

set -e # exit when any command fails
set -v # echo commands

# check for formatting errors
prettier --check "src/**/*.ts"

# run typescript
tsc

# run esbuild
esbuild src/index.ts --outdir=. --bundle --platform=node --external:./node_modules/* --minify --sourcemap
