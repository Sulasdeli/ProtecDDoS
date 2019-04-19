class Customer:
    "General modeling of a customer"
    id = None
    name = None

    region = None
    regionWeight = None

    max_price = None
    min_price = None
    currency = None
    priceWeight = None

    deploymentTime = None
    deploymentWeight = None

    leasingPeriod = None
    leasingWeight = None

    serviceType = None
    serviceTypeWeight = None

    services = []
    serviceSimilarity = None