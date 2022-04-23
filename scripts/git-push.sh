#!/bin/sh

git add .

echo "Enter the commit message: "
read COMMIT_MESSAGE

git commit -m "$COMMIT_MESSAGE"
git push -u origin main