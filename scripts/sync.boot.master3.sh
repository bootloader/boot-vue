#!/bin/sh

# check if a remote named boot already exists, and only add it if it doesn't
git remote get-url boot 2>/dev/null || git remote add boot git@github.com:bootloader/boot-vue.git

# Fetch all branches from the 'boot' remote
git fetch boot

# Check if local branch 'boot_master' exists
if git show-ref --verify --quiet refs/heads/boot_master-v3; then
    # If it exists, just check it out
    git checkout boot_master-v3
else
    # If it doesn't exist, create it from boot/master
    git checkout -b boot_master-v3 boot/master-v3
fi

git pull --rebase boot master-v3

git checkout master-v3

git pull --rebase origin master-v3


git merge boot_master-v3



