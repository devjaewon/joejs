#!/bin/sh

DIRS=(packages/**)

rm -rf ./node_modules
rm -rf ./yarn.lock

for DIR in "${DIRS[@]}"
do
  rm -rf ./$DIR/.rollup.cache
  rm -rf ./$DIR/node_modules
  rm -rf ./$DIR/tsconfig.tsbuildinfo
done

yarn install
