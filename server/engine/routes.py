from flask import jsonify, request
from sqlalchemy_imageattach.context import (pop_store_context, push_store_context)
from werkzeug.exceptions import BadRequest, NotFound

from engine import app, db
from engine import store
from engine.database.models import Provider, CustomerProfile, Review
from engine.helpers.service_helper import ServicesHelper
from engine.recommender_engine import RecEngine
from engine.schemas.recommend_provider_schema import recommend_provider_schema


@app.before_request
def start_implicit_store_context():
    push_store_context(store)


@app.teardown_request
def stop_implicit_store_context(exception=None):
    pop_store_context()


@app.route("/v1/providers")
def get_providers():
    return jsonify([i.serialize for i in Provider.query.all()])


@app.route("/v1/providers/<id>")
def get_provider(id):
    provider = Provider.query.get(id)

    if provider is None:
        raise BadRequest("Provider with the specified ID does not exist")
    return jsonify(provider.serialize)


@app.route("/v1/recommend", methods=['POST'])
def recommend_provider():
    # Validate Data
    if not recommend_provider_schema.is_valid(request.get_json()):
        raise BadRequest('Data is not valid')

    # Map Json request to model
    custProfile = CustomerProfile().json_to_obj(request.get_json())

    # Set the services helper
    # helper = mock_services()
    helper = ServicesHelper(Provider.query.all(), custProfile.budget)
    helper.apply_filters_to_services(custProfile)

    re = RecEngine(helper, custProfile)

    return jsonify([i.serialize for i in re.recommend_services()])


@app.route("/v1/upload", methods=['POST'])
def upload_review():
    if request.files['file']:

        provider = Provider.query.get(request.form['serviceId'])

        if provider is not None:

            customerReview = Review(provider_id=provider.id, rating=request.form['rating'],
                                    comment=request.form['comment'],
                                    fileName=request.files['file'].filename, fileData=request.files['file'].read())
            with app.app_context():
                db.session.add(customerReview)
                db.session.commit()
                db.session.refresh(customerReview)
                db.session.close()

            return jsonify(customerReview.serialize)
        else:
            raise NotFound("Provider with given id does not exist")

    else:
        raise BadRequest("The review does not include a Log File")

