#!/bin/bash
set -eu

npm ci
npm run build
npm run verify

rm -rf node_modules
npm ci --only=production
git add dist
