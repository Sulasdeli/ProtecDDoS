from flask import jsonify, request
from sqlalchemy_imageattach.context import (pop_store_context, push_store_context)
from werkzeug.exceptions import BadRequest, NotFound
import os
from engine import app, db
from engine import store
from engine.database.models import Provider, CustomerProfile, Review
from engine.helpers.service_helper import ServicesHelper
from engine.recommender_engine import RecEngine
from engine.schemas.recommend_provider_schema import recommend_provider_schema
from engine.schemas.upload_service_schema import upload_service_schema


@app.before_request
def start_implicit_store_context():
    push_store_context(store)


@app.teardown_request
def stop_implicit_store_context(exception=None):
    pop_store_context()


@app.route("/v1/services")
def get_services():
    return jsonify([i.serialize() for i in Provider.query.all()])


@app.route("/v1/services/<id>")
def get_service(id):
    provider = Provider.query.get(id)

    if provider is None:
        raise BadRequest("Service with the specified ID does not exist")
    return jsonify(provider.serialize())


@app.route("/v1/services", methods=['POST'])
def upload_service():

    # Store logo locally
    if request.files['file']:
        file = request.files['file']
        file.save(os.path.join('static/images', file.filename))

        # Map Json request to model
        new_service = Provider().form_to_obj(request.form, file)

        with app.app_context():
            with open(f"static/images/{new_service.imageName}", 'rb') as f:
                new_service.image.from_file(f)
            db.session.add(new_service)
            db.session.commit()
            db.session.refresh(new_service)
            db.session.close()

    return jsonify("done")



@app.route("/v1/recommend", methods=['POST'])
def recommend_service():
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

    return jsonify(re.recommend_services())


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
            raise NotFound("Service with given id does not exist")

    else:
        raise BadRequest("The review does not include a Log File")

