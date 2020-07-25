#!/bin/sh
today=$(date +"%Y-%m-%d")
yarn install 2>&1 > results.log
git pull 2>&1 > results.log
node update.js 2>&1 > results.log
git add . 2>&1 > results.log
git commit -m "Update blog posts as of ${today} morning" 2>&1 > results.log
git push 2>&1 > results.log

