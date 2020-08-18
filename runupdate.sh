#!/bin/sh
today=$(/bin/date +"%Y-%m-%d")
/usr/bin/id
/bin/echo $HOME
/usr/bin/ssh-add "${HOME}/.ssh/github_rsa"
/usr/bin/git pull
/usr/local/bin/yarn install
/usr/bin/node update.js
/usr/bin/git add .
/usr/bin/git commit -m "Update blog posts as of the morning of ${today}"
/usr/bin/git push

