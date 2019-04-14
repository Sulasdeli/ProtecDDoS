from datetime import datetime
from engine import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

class Provider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    serviceName = db.Column(db.String(100), nullable=False)
    description = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    type = db.Column(db.Text, nullable=False)
    region = db.Column(db.Text, nullable=False)
    deployment = db.Column(db.Text, nullable=False)
    leasingPeriod = db.Column(db.Text, nullable=False)
    price = db.Column(db.Text, nullable=False)
    currency = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Provider('{self.serviceName}', '{self.type}', '{self.region}', '{self.price}', '{self.currency}')"