from flask import Flask, request
import os
import json
import uuid
import time
import requests


app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    return "I am up bitchess!!"


@app.route("/log", methods=["POST"])
def log():

    log_data = request.get_json()
    random_id = uuid.uuid4()
    with open(f"temp/{random_id}.json", "w") as json_file:
        json_file.write(json.dumps(log_data))

    headers = {"Authorization": f"Bearer {os.getenv('ACCESS_TOKEN')}"}
    para = {
        "name": f"{random_id}.json",
        "parents": [os.getenv("PARENT_ID")],
    }
    files = {
        "data": ("metadata", json.dumps(para), "application/json; charset=UTF-8"),
        "file": (
            "application/json",
            open(f"./temp/{random_id}.json", "rb"),
        ),  # replace 'application/zip' by 'image/png' for png images; similarly 'image/jpeg' (also replace your file name)
    }
    requests.post(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        headers=headers,
        files=files,
    )
    # TODO: Fix used by another process error.
    os.remove(f"./temp/{random_id}.json")
    return json.dumps({"message": "Ok 👍!"})


if __name__ == "__main__":
    app.run(debug=True)
