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
    features = db.Column(db.PickleType, nullable=False)
    region = db.Column(db.PickleType, nullable=False)
    deployment = db.Column(db.Text, nullable=False)
    leasingPeriod = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)
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
            'features': self.features,
            'region': self.region,
            'deployment': self.deployment,
            'leasingPeriod': self.leasingPeriod,
            'price': self.price,
            'currency': self.currency,
        }

    def __repr__(self):
        return f"Provider('{self.serviceName}', '{self.type}', '{self.region}', '{self.price}', '{self.currency}')"


def load_data(app, db):
    service1 = Provider(providerName='Akamai', serviceName='Kona Site Defender',
                        description='Kona Site Defender combines automated DDoS mitigation with a highly '
                                    'scalable and accurate WAF to protect websites from a wide range of online threats,'
                                    'including network- and application-layer DDoS, SQL injection and XSS attacks –'
                                    ' without compromising the user experience. Kona Site Defender can stop the largest'
                                    'attacks and leverages Akamai’s visibility into global web traffic to help '
                                    'organizations respond to the latest threats',
                        type='PROACTIVE', features=['VOLUMETRIC', 'PROTOCOL', 'APPLICATION LAYER', 'SSL', 'DNS'],
                        region=['NORTH AMERICA', 'SOUTH AMERICA', 'EUROPE', 'ASIA'], deployment='MINUTES',
                        leasingPeriod='MONTHS', price=5000, currency='USD')

    service2 = Provider(providerName='CloudFlare', serviceName='Advanced DDoS Attack Protection',
                        description='Cloudflare’s advanced DDoS protection, provisioned as a service at the network '
                                    'edge, matches the sophistication and scale of such threats, and can be used to '
                                    'mitigate DDoS attacks of all forms and sizes including those that target the UDP '
                                    'and ICMP protocols, as well as SYN/ACK, DNS amplification and Layer 7 attacks',
                        type='REACTIVE', features=['VOLUMETRIC', 'PROTOCOL', 'APPLICATION', 'DNS'],
                        region=['SOUTH AMERICA', 'EUROPE'], deployment='MINUTES',
                        leasingPeriod='MONTHS', price=3500, currency='USD')

    service3 = Provider(providerName='Imperva', serviceName='Incapsula',
                        description='The Imperva Incapsula service delivers a multi-faceted approach to DDoS defense, '
                                    'providing blanket protection from all DDoS attacks to shield your critical '
                                    'online assets from these threats. Incapsula DDoS protection services are backed '
                                    'by a 24x7 security team, 99.999% uptime SLA, and a powerful, global network of '
                                    'data centers.',
                        type='REACTIVE', features=['VOLUMETRIC', 'PROTOCOL', 'APPLICATION', 'SSL', 'DNS'],
                        region=['NORTH AMERICA', 'SOUTH AMERICA', 'EUROPE'], deployment='SECONDS',
                        leasingPeriod='MONTHS', price=500, currency='USD')

    service4 = Provider(providerName='Verisign', serviceName='Verisign DDoS Protection Service',
                        description='Verisign DDoS Protection Services help organisations reduce the risk of '
                                    'catastrophic DDoS attacks by detecting and filtering malicious traffic aimed at '
                                    'disrupting or disabling their internet-based services. Unlike traditional security'
                                    ' solutions, Verisign DDoS Protection Services filter harmful traffic upstream of '
                                    'the organisational network or in the cloud',
                        type='REACTIVE', features=['VOLUMETRIC', 'PROTOCOL', 'APPLICATION', 'SSL', 'DNS'],
                        region=['NORTH AMERICA', 'SOUTH AMERICA', 'EUROPE'], deployment='SECONDS',
                        leasingPeriod='MONTHS', price=999, currency='USD')

    service5 = Provider(providerName='Arbor Networks', serviceName='Arbor Cloud',
                        description='Arbor Cloud is a DDoS service powered by the world’s leading experts in DDoS '
                                    'mitigation, together with the most widely deployed DDoS protection technology',
                        type='REACTIVE', features=['VOLUMETRIC', 'PROTOCOL', 'APPLICATION' 'SSL', 'DNS'],
                        region=['NORTH AMERICA', 'SOUTH AMERICA', 'EUROPE'], deployment='SECONDS',
                        leasingPeriod='MONTHS', price=600, currency='USD')

    service6 = Provider(providerName='Check Point Software Technologies', serviceName='DDos Protector',
                        description='Check Point DDoS Protector™Appliances block Denial of Service attacks within '
                                    'seconds with multi-layered protection and up to 40 Gbps of performance. Modern '
                                    'DDoS attacks use new techniques to exploit areas where traditional security '
                                    'solutions are not equipped to protect. These attacks can cause serious network '
                                    'downtime to businesses who rely on networks and Web services to operate. DDoS '
                                    'Protectors extend company’s security perimeters to block destructive DDoS attacks '
                                    'before they cause damage.',
                        type='REACTIVE', features=['APPLICATION', 'DNS'],
                        region=['NORTH AMERICA', 'SOUTH AMERICA', 'EUROPE', 'ASIA'], deployment='SECONDS',
                        leasingPeriod='MONTHS', price=2500, currency='USD')

    service7 = Provider(providerName='Corero Network Security, Inc.', serviceName='SmartWall® Threat Defense System',
                        description='The Corero SmartWall Threat Defense System (TDS) delivers comprehensive DDoS '
                                    'protection, eliminating attacks automatically and in real-time.The SmartWall '
                                    'Network Threat Defense (NTD) solutions include innovative technology for the '
                                    'mitigation of DDoS attacks of all sizes, including stealthy sub-saturating '
                                    'attacks, in seconds vs minutes (in contrast to legacy DDoS solutions), allowing '
                                    'good user traffic to flow uninterrupted and enabling applications and services to '
                                    'remain online, continuously, even whilst under attack',
                        type='REACTIVE', features=['APPLICATION', 'VOLUMETRIC'],
                        region=['NORTH AMERICA', 'SOUTH AMERICA', 'EUROPE', 'ASIA'], deployment='SECONDS',
                        leasingPeriod='MONTHS', price=3200, currency='USD')

    service8 = Provider(providerName='Flowmon Networks', serviceName='Flowmon DDoS Defender',
                        description='Flowmon DDoS Defender puts advanced artificial intelligence between your critical '
                                    'systems and criminals. Without any changes in infrastructure, in a matter of '
                                    'minutes, network and security engineers will have up-and-running active DDoS '
                                    'protection',
                        type='REACTIVE', features=['APPLICATION'],
                        region=['NORTH AMERICA', 'SOUTH AMERICA', 'EUROPE', 'ASIA'], deployment='SECONDS',
                        leasingPeriod='MONTHS', price=2345, currency='USD')

    service9 = Provider(providerName='Level 3 Communications', serviceName='Level 3 DDos Mitigation',
                        description='Level 3 provides layers of defense through enhanced network routing, rate '
                                    'limiting and filtering that can be paired with advanced network-based detection '
                                    'and mitigation scrubbing center solutions. Our mitigation approach is informed by '
                                    'threat intelligence derived from visibility across our global infrastructure and '
                                    'data correlation. Tailored for any business and IT/security budget, our flexible '
                                    'managed service can proactively detect and mitigate the threats of today to help '
                                    'ensure business-as-usual for employees, partners and customers',
                        type='REACTIVE', features=['APPLICATION', 'VOLUMETRIC'],
                        region=['EUROPE'], deployment='SECONDS',
                        leasingPeriod='MONTHS', price=107, currency='USD')

    service10 = Provider(providerName='F5 Networks', serviceName='F5 Silverline DDoS Protection',
                        description=' F5’s DDoS Protection solution protects the fundamental elements of an application'
                                    ' (network, DNS, SSL, and HTTP) against distributed denial-of-service attacks. '
                                    'Leveraging the intrinsic security capabilities of intelligent traffic management '
                                    'and application delivery, F5 protects and ensures availability of an '
                                    'organization\'s network and application infrastructure under the most '
                                    'demanding conditions',
                        type='REACTIVE', features=['VOLUMETRIC', 'PROTOCOL', 'APPLICATION LAYER', 'SSL', 'DNS'],
                        region=['EUROPE'], deployment='MINUTES',
                        leasingPeriod='DAYS', price=106, currency='USD')

    with app.app_context():
        db.session.add(service1)
        db.session.add(service2)
        db.session.add(service3)
        db.session.add(service4)
        db.session.add(service5)
        db.session.add(service6)
        db.session.add(service7)
        db.session.add(service8)
        db.session.add(service9)
        db.session.add(service10)
        db.session.commit()
