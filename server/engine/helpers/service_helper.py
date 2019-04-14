#Hardcoded allowed values to describe service characteristics / ideally should be read from a DB
TYPE = ["REACTIVE", "PROACTIVE"]
REGIONS = ["NORTH AMERICA", "SOUTH AMERICA", "EUROPE", "ASIA", "AFRICA"]
DEPLOYMENT_TIME = ["SECONDS", "MINUTES", "HOURS", "DAYS"]
LEASING_PERIOD = ["MINUTES", "HOURS", "DAYS", "WEEKS", "MONTHS"]
PRIORITY = ["HIGH", "MEDIUM", "LOW"]

class ServicesHelper:
    "Helper class of Services"
    #Store all "service" objects
    services = []

    def __init__(self):
        self.type_dict = self.dict_characteristics(TYPE)
        self.region_dict = self.dict_characteristics(REGIONS)
        self.deployment_dict = self.dict_characteristics(DEPLOYMENT_TIME)
        self.leasing_dict = self.dict_characteristics(LEASING_PERIOD)

    def dict_characteristics(self, serviceCharacteristic):
        "Return a dictionary of a given characteristic with key from 1 to the size of the list"
        assert isinstance(serviceCharacteristic, list), "Characteristic should be a list"
        return {i+1 : serviceCharacteristic[i] for i in range(0, len(serviceCharacteristic))}

    def get_key_from_value(self, serviceCharacteristic, value):
        assert isinstance(serviceCharacteristic, dict), "Characteristic should be a dictionary"
        for key, item in serviceCharacteristic.items():
            if value == item:
                return key

    def filter_by_price(self, min = None, max = None, list = None):
        "Return services between a price range"
        servicesFound = []
        if list is not None:
            services = list
        else:
            services = self.services
        if max and min:
            for s in services:
                if s.price >= min and s.price <= max:
                    servicesFound.append(s)
        elif max and not min:
            for s in services:
                if s.price <= max:
                    servicesFound.append(s)
        elif min and not max:
            for s in services:
                if s.price >= min:
                    servicesFound.append(s)
        return servicesFound

    def filter_by_type(self, type, list = None):
        "Return services of a given type"
        assert type in TYPE, "Invalid Service Type"
        servicesFound = []
        if list is not None:
            services = list
        else:
            services = self.services
        for s in services:
            if s.type == type:
                servicesFound.append(s)
        return servicesFound

    def filter_by_region(self, region, list = None):
        "Return services of a given region"
        assert region in REGIONS, "Invalid Service Region"
        servicesFound = []
        if list is not None:
            services = list
        else:
            services = self.services
        for s in services:
            if s.region == region:
                servicesFound.append(s)
        return servicesFound

    def filter_by_deployment(self, deploymentPeriod, list = None):
        "Return services within a deployment time frame"
        assert deploymentPeriod in DEPLOYMENT_TIME, "Invalid Deployment Time"
        servicesFound = []
        if list is not None:
            services = list
        else:
            services = self.services
        for s in services:
            if deploymentPeriod in s.deployment:
                servicesFound.append(s)
        return servicesFound

    def filter_by_leasing(self, leasingPeriod, list = None):
        "Return services within a leasing period"
        assert leasingPeriod in LEASING_PERIOD, ("Invalid Leasing Period")
        servicesFound = []
        if list is not None:
            services = list
        else:
            services = self.services
        for s in services:
            if leasingPeriod in s.leasingPeriod:
                servicesFound.append(s)
        return servicesFound