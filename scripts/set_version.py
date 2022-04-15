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

with open(
    os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(__file__), "../.env")),
    "r+",
) as env:
    lines = []
    for line in env.readlines():
        if (not line.startswith("VERSION")) and line != "\n":
            lines.append(line)

    lines.append(f"VERSION={version}")
    env.seek(0)
    env.truncate(1)
    env.write("\n".join(lines))
