import numpy as np

class RecEngine:
    "Recommendation Engine"

    def __init__(self, services, customer):
        self.servicesHelper = services
        self.customerHelper = customer

    def calc_customer_index(self):
        "Return an array with the customer index"
        cs = self.customerHelper
        sh = self.servicesHelper
        regionIndex = sh.get_key_from_value(sh.region_dict, cs.region)
        serviceTypeIndex = sh.get_key_from_value(sh.type_dict, cs.serviceType)
        deploymentTimeIndex = sh.get_key_from_value(sh.deployment_dict, cs.deploymentTime)
        leasingPeriodIndex = sh.get_key_from_value(sh.leasing_dict, cs.leasingPeriod)
        cs.serviceSimilarity = [regionIndex, serviceTypeIndex, deploymentTimeIndex, leasingPeriodIndex, cs.min_price]
        return True

    def calc_service_index(self):
        "Update the serviceSimilarity array of each service"
        sh = self.servicesHelper
        for s in sh.services:
            regionIndex = sh.get_key_from_value(sh.region_dict, s.region)
            serviceTypeIndex = sh.get_key_from_value(sh.type_dict, s.type)
            deploymentTimeIndex = sh.get_key_from_value(sh.deployment_dict, s.deployment)
            leasingPeriodIndex = sh.get_key_from_value(sh.leasing_dict, s.leasingPeriod)
            s.serviceSimilarity = [regionIndex, serviceTypeIndex, deploymentTimeIndex, leasingPeriodIndex, s.price]
        return True

    def calc_similarity(self):
        "Calculate the cosine similarity of the service list and return a sorted list"
        sh = self.servicesHelper
        cs = self.customerHelper

        #Store similarities per service --> (service id : ranking)
        similarity = {}

        #Steps below are needed to "encode" our characteristics
        self.calc_customer_index()
        self.calc_service_index()

        #Source: http://www.ashukumar27.io/similarity_functions/

        def cosine_similarity(x,y):
            def square_rooted(x):
                return np.sqrt(sum([a*a for a in x]))
            numerator = sum(a*b for a,b in zip(x,y))
            denominator = square_rooted(x)*square_rooted(y)
            return numerator/float(denominator)

        def jaccard_similarity(x,y):
            intersection_cardinality = len(set.intersection(*[set(x), set(y)]))
            union_cardinality = len(set.union(*[set(x), set(y)]))
            return intersection_cardinality/float(union_cardinality)

        def euclidean_distance(x,y):
            return np.sqrt(sum(pow(a-b,2) for a, b in zip(x, y)))

        def manhattan_distance(x,y):
            return sum(abs(a-b) for a,b in zip(x,y))

        #TODO: Note that we're still not using the weights
        w = [cs.regionWeight, cs.serviceTypeWeight, cs.deploymentWeight, cs.leasingWeight, cs.priceWeight]
        #Customer definitions/requirements
        x = cs.serviceSimilarity
        for s in sh.services:
            #Service characteristics
            y = s.serviceSimilarity
            #Calc of metrics
            s.euclideanDistance = euclidean_distance(x, y) #higher -> better
            s.jaccardSimilarity = jaccard_similarity(x, y) #higher -> better
            s.cosineSimilarity = cosine_similarity(x, y) #higher -> better
            s.manhattanDistance = manhattan_distance(x,y) #lower -> better
            #Rating is given based on a normalization of all ratings
            s.rating = np.linalg.norm([s.euclideanDistance, s.jaccardSimilarity, s.cosineSimilarity, s.manhattanDistance])
            similarity.update({s.id:s.rating})

        #Sort services by similarity index
        sortedCosineSimilarity = [(k, similarity[k]) for k in sorted(similarity, key=similarity.get)]
        return sortedCosineSimilarity

    def recommend_services(self, topNServices = None):
        "Filter the sorted services to find the most (topServices) similar ones"
        #sortedServices = self.calc_cosine_similarity()
        sortedServices = self.calc_similarity()
        if topNServices and topNServices > 0 and topNServices <= len(sortedServices):
            counter = 0
            for i, (k, v) in enumerate(sortedServices):
                if counter == topNServices: break
                counter += 1
                print ("Ranking", i, "Service ID:", k)
                for s in self.servicesHelper.services:
                    if s.id == k:
                        print("CHF:", s.price, s.type, s.region, s.deployment, s.leasingPeriod)
                        print("Rating:", s.rating, "Euclidean", s.euclideanDistance, "Jaccard:", s.jaccardSimilarity, "Cosine:", s.cosineSimilarity, "Manhattan:", s.manhattanDistance)
