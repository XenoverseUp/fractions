#!/usr/bin/env python

import os
import argparse
import json


appropriate_manifest = {}


with open(
    os.path.realpath(
        os.path.join(os.getcwd(), os.path.dirname(__file__), "../manifest.json")
    ),
    "r",
) as data:
    manifest = json.load(data)
    appropriate_manifest["name"] = manifest["name"]
    appropriate_manifest["version"] = manifest["version"]
    appropriate_manifest["description"] = manifest["description"]
    appropriate_manifest["author"] = manifest["author"]
    appropriate_manifest["icons"] = manifest["icons"]

parser = argparse.ArgumentParser(
    description="This will update the manifests of the build."
)

parser.add_argument(
    "build", choices=["chromium", "firefox"], help="The target browser."
)
args = parser.parse_args()


root = os.path.realpath(
    os.path.join(os.getcwd(), os.path.dirname(__file__), f"../build/{args.build}")
)

if args.build == "chromium":
    appropriate_manifest["manifest_version"] = 3
    appropriate_manifest["host_permissions"] = ["https://medium.com/"]
    appropriate_manifest["background"] = {"service_worker": "/serviceWorker.js"}
    appropriate_manifest["action"] = {
        "default_title": "Fractions",
        "default_popup": "/popup.html",
    }
elif args.build == "firefox":
    appropriate_manifest["manifest_version"] = 2
    appropriate_manifest["short_name"] = "Fractions"
    appropriate_manifest["permissions"] = ["https://medium.com/"]
    appropriate_manifest["background"] = {
        "scripts": ["serviceWorker.js"],
        "persistent": False,
    }
    appropriate_manifest["browser_action"] = {
        "default_title": "Fractions",
        "default_popup": "/popup.html",
    }
    appropriate_manifest["browser_specific_settings"] = {
        "gecko": {
            "id": "{6a3d8bbc-24ac-4d2c-8b67-c658388e9c8d}",
            "strict_min_version": "57.0",
        }
    }

with open(os.path.join(root, "manifest.json"), "w") as manifest:
    manifest.write(json.dumps(appropriate_manifest))
