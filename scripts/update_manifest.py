#!/usr/bin/env python

import os
import argparse
import json

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

    if args.build == "chromium":
        appropriate_manifest["manifest_version"] = manifest["chromium"][
            "manifest_version"
        ]
        appropriate_manifest["host_permissions"] = manifest["permissions"]
        appropriate_manifest["background"] = {
            "service_worker": manifest["background"]["scripts"][0]
        }
        appropriate_manifest["action"] = manifest["browser_action"]
    elif args.build == "firefox":
        appropriate_manifest["manifest_version"] = manifest["manifest_version"]
        appropriate_manifest["short_name"] = manifest["firefox"]["short_name"]
        appropriate_manifest["permissions"] = manifest["permissions"]
        appropriate_manifest["background"] = manifest["background"]
        appropriate_manifest["action"] = manifest["browser_action"]
        appropriate_manifest["browser_specific_settings"] = manifest["firefox"][
            "browser_specific_setttings"
        ]

with open(os.path.join(root, "manifest.json"), "w") as manifest:
    manifest.write(json.dumps(appropriate_manifest))
