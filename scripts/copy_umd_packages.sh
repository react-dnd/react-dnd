#!/bin/sh
set -e
mkdir -p packages/alternative_builds/umd/dist && 
cp packages/core/react-dnd/dist/umd/*.js packages/alternative_builds/umd/dist &&
cp packages/core/html5-backend/dist/umd/*.js packages/alternative_builds/umd/dist && 
cp packages/core/touch-backend/dist/umd/*.js packages/alternative_builds/umd/dist
