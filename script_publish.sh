#!/bin/sh

PKG=$1
FULL_PKG="@philip21/${PKG}"

yarn workspace $FULL_PKG publish --access=public
