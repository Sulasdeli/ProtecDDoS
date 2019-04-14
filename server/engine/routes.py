from engine import app
from engine.database.models import Provider
from flask import jsonify


@app.route("/")
def helloWorld():
  return 'Hello World!'

@app.route("/v1/providers")
def getProviders():
  return jsonify([i.serialize for i in Provider.query.all()])