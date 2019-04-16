from engine import app
from engine.database.models import Provider
from flask import jsonify, request
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
  cs.region = ["EUROPE", "SOUTH AMERICA"]
  cs.serviceType = "REACTIVE"
  cs.deploymentTime = "MINUTES"
  cs.leasingPeriod = "DAYS"
  cs.min_price = 3000
  cs.max_price = 10000


  helper = ServicesHelper()
  helper.services = Provider.query.all()


  re = RecEngine(helper, cs)

  re.calc_customer_index()
  re.calc_service_index()
  return ''