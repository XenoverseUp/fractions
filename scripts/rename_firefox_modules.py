#!/usr/bin/env python
import os
import re
from bs4 import BeautifulSoup

root = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__), "../build/firefox"))
regex = re.compile("^popup.*\.js$")
old_name = ""

for root, dirs, files in os.walk(root):
  for file in files:
    if regex.match(file):
       old_name = file


root = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__), "../build/firefox"))

old_hash = old_name.split("js")[0]
new_name = old_hash + "mjs"


old_path = os.path.join(root, old_name)
new_path = os.path.join(root, new_name)

os.rename(old_path, new_path)

with open(os.path.join(root, "popup.html"), "r+", encoding="utf8") as html_string:
  data = html_string.read()


  soup = BeautifulSoup(data, features="html.parser")

  for script in soup.find_all("script"):
    script["src"] = f"/{new_name}"


  html_string.seek(0)
  html_string.truncate(1)
  html_string.write(str(soup))

  html_string.close()

print("Done.")