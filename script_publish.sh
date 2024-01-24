#!/bin/sh

PKG=$1
FULL_PKG="@kjojs/${PKG}"

yarn workspace $FULL_PKG publish --access=public
