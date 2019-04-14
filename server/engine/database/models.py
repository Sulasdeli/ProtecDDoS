from datetime import datetime
from engine import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password
        }

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"


class Provider(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    providerName = db.Column(db.String(100), nullable=False)
    serviceName = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False, default=datetime.utcnow)
    type = db.Column(db.Text, nullable=False)
    region = db.Column(db.Text, nullable=False)
    deployment = db.Column(db.Text, nullable=False)
    leasingPeriod = db.Column(db.Text, nullable=False)
    price = db.Column(db.Text, nullable=False)
    currency = db.Column(db.Text, nullable=False)

    @property
    def serialize(self):
        """Return object data in easily serializable format"""
        return {
            'id': self.id,
            'providerName': self.providerName,
            'serviceName': self.serviceName,
            'description': self.description,
            'type': self.type,
            'region': self.region,
            'deployment': self.deployment,
            'leasingPeriod': self.leasingPeriod,
            'price': self.price,
            'currency': self.currency,
        }

    def __repr__(self):
        return f"Provider('{self.serviceName}', '{self.type}', '{self.region}', '{self.price}', '{self.currency}')"


def load_data(app, db):
    service1 = Provider(providerName='Akamai', serviceName='Kona Site Defender', description='Integrated protection for websites and APIs against sophisticated DDoS and web application attacks',
                        type='PROACTIVE', region='EUROPE',
                        deployment='MINUTES', leasingPeriod='MONTHS', price='5000', currency='USD')

    with app.app_context():
        db.session.add(service1)
        db.session.commit()
