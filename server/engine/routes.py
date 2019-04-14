from engine import app


@app.route("/")
def helloWorld():
  return 'Hello World!'

@app.route("/v1/providers")
def getProviders():
  return 'list of providers'