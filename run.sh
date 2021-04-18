#/bin/bash

BASEDIR=$(dirname "$0")

ts-node --project $BASEDIR/tsconfig.json $BASEDIR/main.ts "$@"