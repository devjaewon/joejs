#!bin/sh

PKG=$0
FULL_PKG="@kjojs/${PKG}"

yarn workspace $FULL_PKG publish --access=public
