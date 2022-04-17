from flask import Flask, request
import json
import uuid

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

    # TODO / Upload temp JSON files to drive and delete it from FS.
    return json.dumps({"message": "Ok 👍!"})


if __name__ == "__main__":
    app.run(debug=True)
