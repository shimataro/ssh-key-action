#!/bin/bash

set -e

npm ci
npm run build
npm run verify

rm -rf node_modules
npm ci --only=production
git add node_modules package-lock.json lib
