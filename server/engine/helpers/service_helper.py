from engine.helpers.const.service_characteristics import TYPE, REGIONS, DEPLOYMENT_TIME, LEASING_PERIOD

class ServicesHelper:
    """Helper class of Services"""

    def __init__(self, services, customer_budget):
        self.customer_budget = customer_budget
        self.services = services
        self.type_dict = self.dict_characteristics(TYPE)
        self.region_dict = self.dict_characteristics(REGIONS)
        self.deployment_dict = self.dict_characteristics(DEPLOYMENT_TIME)
        self.leasing_dict = self.dict_characteristics(LEASING_PERIOD)

    def dict_characteristics(self, serviceCharacteristic):
        """Return a dictionary of a given characteristic with calculated indices"""
        assert isinstance(serviceCharacteristic, list), "Characteristic should be a list"
        return {(i+1) * ((self.customer_budget/2) / len(serviceCharacteristic)): serviceCharacteristic[i] for i in range(0, len(serviceCharacteristic))}

    def calculate_index(self, serviceCharacteristic, indivCharacteristic):
        assert isinstance(serviceCharacteristic, dict), "Characteristic should be a dictionary"
        assert isinstance(indivCharacteristic, list) or isinstance(indivCharacteristic, str)
        index = 0

        if isinstance(indivCharacteristic, list):
            for key, item in serviceCharacteristic.items():
                if item in indivCharacteristic:
                    index += key
        elif isinstance(indivCharacteristic, str):
            for key, item in serviceCharacteristic.items():
                if indivCharacteristic == item:
                    index = key
        return index

    def filter_by_price(self,maxPrice = None, updatedServices = None):
        """Return services between a price range"""
        servicesFound = []
        if updatedServices is not None:
            services = updatedServices
        else:
            services = self.services
        if maxPrice:
            for s in services:
                if s.price <= maxPrice:
                    servicesFound.append(s)
        return servicesFound

    def filter_by_type(self, types, updatedServices = None):
        """Return services of a given type"""
        assert isinstance(types, list), "Service Type should be a list"
        servicesFound = []
        if updatedServices is not None:
            services = updatedServices
        else:
            services = self.services
        for s in services:
            if set(types) <= set(s.type):
                servicesFound.append(s)
        return servicesFound

    def filter_by_region(self, regions, updatedServices = None):
        """Return services of a given region"""
        assert isinstance(regions, list), "regions should be a list"
        servicesFound = []
        if updatedServices is not None:
            services = updatedServices
        else:
            services = self.services
        for s in services:
            if set(regions) <= set(s.region):
                servicesFound.append(s)
        return servicesFound

    def filter_by_deployment(self, deploymentPeriod, list = None):
        """Return services within a deployment time frame"""
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
        """Return services within a leasing period"""
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

    def apply_filters_to_services(self, cs):
        list = self.filter_by_price(cs.budget)
        list = self.filter_by_region(cs.region, list)
        list = self.filter_by_type(cs.serviceType, list)
        self.services = list