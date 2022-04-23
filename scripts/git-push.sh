#!/bin/sh

git add .

echo "Enter the commit message: "
read COMMIT_MESSAGE

git commit -m "${COMMIT_MESSAGE}"

if [ "$1" == "force"]; then 
	git push -f origin main
else
	git push -u origin main
fi