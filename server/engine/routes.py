from werkzeug.exceptions import BadRequest

from engine import app
from engine.database.models import Provider
from flask import jsonify, request
from engine.recommender_engine import RecEngine
from engine.helpers.service_helper import ServicesHelper
from engine.schemas.recommend_provider_schema import recommend_provider_schema
from engine.database.models import CustomerProfile
from engine.database.models import mock_services

@app.route("/")
def helloWorld():
  return 'Home Page'

@app.route("/v1/providers")
def getProviders():
  return jsonify([i.serialize for i in Provider.query.all()])

@app.route("/v1/recommend", methods=['POST'])
def recommend_provider():

  # Validate Data
  if not recommend_provider_schema.is_valid(request.get_json()):
    raise BadRequest('Data is not valid')

  # Map Json request to model
  custProfile = CustomerProfile().json_to_obj(request.get_json())

  # Set the services helper
  #helper = mock_services()
  helper = ServicesHelper(Provider.query.all())
  helper.apply_filters_to_services(custProfile)

  re = RecEngine(helper, custProfile)

  return jsonify([i.serialize for i in re.recommend_services()])