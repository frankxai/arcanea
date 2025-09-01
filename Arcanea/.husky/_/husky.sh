#!/bin/sh

if [ -f ~/.huskyrc ]; then
  . ~/.huskyrc
fi

hookname=$(basename "$0")

a="husky-run"; b="$HUSKY_GIT_PARAMS"; [ "$b" = "" ] && b="$*"; npx --no -- "$a" "$hookname" "$b"
