from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from flask import Flask, request
import os
import io
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

    gauth = GoogleAuth()
    drive = GoogleDrive(gauth)

    gfile = drive.CreateFile[{"id": os.getenv("PARENT_ID")}]
    gfile.SetContentFile(f"temp/{random_id}.json")
    gfile.Upload()

    # os.remove(f"./temp/{random_id}.json")
    return json.dumps({"message": "Ok 👍!"})


if __name__ == "__main__":
    app.run(debug=True)
