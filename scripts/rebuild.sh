#!/bin/bash

rm -rf node_modules package-lock.json
npm i
npm run build
npm ci --only=production
git add node_modules package-lock.json lib
