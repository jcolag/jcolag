#!/bin/sh
today=$(date +"%Y-%m-%d")
yarn install
git pull
node update.js
git add .
git commit -m "Update blog posts as of ${today} morning"
git push

