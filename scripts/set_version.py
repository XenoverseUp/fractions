#!/usr/bin/env python

import os
import json

version = ""

with open(
    os.path.realpath(
        os.path.join(os.getcwd(), os.path.dirname(__file__), "../manifest.json")
    ),
    "r",
) as data:
    manifest = json.load(data)
    version = manifest["version"]

# TODO Check if there is already a VERSION in env file.
with open(
    os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__), "../.env")),
    "a",
) as env:
    env.write("\n")
    env.write(f"VERSION={version}")
