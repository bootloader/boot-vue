#!/bin/sh

# Save the current branch name
current_branch=$(git rev-parse --abbrev-ref HEAD)

# check if a remote named boot already exists, and only add it if it doesn't
git remote get-url boot 2>/dev/null || git remote add boot git@github.com:bootloader/boot-vue.git

# Fetch all branches from the 'boot' remote
git fetch boot

# Check if local branch 'boot_$current_branch' exists
if git show-ref --verify --quiet refs/heads/boot_"$current_branch"; then
    # If it exists, just check it out
    git checkout boot_"$current_branch"
else
    # If it doesn't exist, create it from boot/build-xyz
    git checkout -b boot"$current_branch" boot/"$current_branch"
fi

git pull --rebase boot "$current_branch"

git checkout "$current_branch"

git pull --rebase origin "$current_branch"


git merge boot_"$current_branch"