from engine import app
from engine.database.models import Provider
from flask import jsonify, request, Response
from engine.recommender_engine import RecEngine
from engine.entities.customer import Customer
from engine.helpers.service_helper import ServicesHelper

@app.route("/")
def helloWorld():
  return 'Hello World!'

@app.route("/v1/providers")
def getProviders():
  return jsonify([i.serialize for i in Provider.query.all()])

@app.route("/v1/recommend", methods=['POST'])
def recommend_provider():
  cs = Customer()
  cs.name = "Erion"
  cs.region = ["EUROPE"]
  cs.serviceType = "REACTIVE"
  cs.deploymentTime = "MINUTES"
  cs.leasingPeriod = "DAYS"
  cs.min_price = 0
  cs.max_price = 5000

  # Set the services helper
  helper = ServicesHelper(Provider.query.all())
  helper.apply_filters_to_services(cs)

  re = RecEngine(helper, cs)

  return jsonify([i.serialize for i in re.recommend_services(0)])