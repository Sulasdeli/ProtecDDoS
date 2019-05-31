import numpy as np
from engine.helpers.similarity_functions import euclidean_distance, jaccard_similarity, cosine_similarity,\
    manhattan_distance, pearson_correlation, minkowski_distance
import json


class RecEngine:
    "Recommendation Engine"

    def __init__(self, services, customer):
        self.services = services
        self.customer = customer

    def calc_customer_index(self):
        "Return an array with the customer index"
        cs = self.customer
        sh = self.services
        deploymentTimeIndex = sh.calculate_index(sh.deployment_dict, cs.deploymentTime)
        leasingPeriodIndex = sh.calculate_index(sh.leasing_dict, cs.leasingPeriod)
        cs.serviceSimilarity = [deploymentTimeIndex, leasingPeriodIndex, cs.budget]
        print('CUSTOMER: ', cs.serviceSimilarity)

    def calc_service_index(self):
        "Update the serviceSimilarity array of each service"
        sh = self.services
        for s in sh.services:
            deploymentTimeIndex = sh.calculate_index(sh.deployment_dict, s.deployment)
            leasingPeriodIndex = sh.calculate_index(sh.leasing_dict, s.leasingPeriod)
            s.serviceSimilarity = [deploymentTimeIndex, leasingPeriodIndex, self.customer.budget - s.price]
            print('SERVICE: ', s.serviceSimilarity)

    def calc_similarity(self):
        "Calculate the cosine similarity of the service list and return a sorted list"
        sh = self.services
        cs = self.customer

        #Store similarities per service --> (service id : ranking)
        similarity = {}

        # assign an int to each characteristic
        self.calc_customer_index()
        self.calc_service_index()

        customerProfileWeights = [cs.deploymentTimeWeight, cs.leasingPeriodWeight, cs.budgetWeight]

        # Customer definitions/requirements
        cs.weighted_similarity = np.multiply(cs.serviceSimilarity, customerProfileWeights)

        for s in sh.services:
            #Service characteristics
            s.weighted_similarity = np.multiply(s.serviceSimilarity, customerProfileWeights)

            # Calculation of Similarity
            s.euclideanDistance = euclidean_distance(cs.weighted_similarity, s.weighted_similarity)     #lower -> better
            s.jaccardSimilarity = jaccard_similarity(cs.weighted_similarity, s.weighted_similarity)     #higher -> better
            s.cosineSimilarity = cosine_similarity(cs.weighted_similarity, s.weighted_similarity)       #higher -> better
            s.manhattanDistance = manhattan_distance(cs.weighted_similarity, s.weighted_similarity)     #lower -> better
            s.pearsonCorrelation = pearson_correlation(cs.weighted_similarity, s.weighted_similarity)   #higher -> better
            s.minkowskiDistance = minkowski_distance(cs.weighted_similarity, s.weighted_similarity, len(s.weighted_similarity)) #higher -> better

            #Rating is given based on a normalization of all ratings
            s.rating = np.linalg.norm([s.euclideanDistance, s.jaccardSimilarity, s.cosineSimilarity, s.manhattanDistance, s.pearsonCorrelation, s.minkowskiDistance])
            similarity.update({s.id:s.rating})

        #Sort services by similarity index
        sortedNormalizedSimilarities = [(k, similarity[k]) for k in sorted(similarity, key=similarity.get)]

        return sortedNormalizedSimilarities

    def recommend_services(self, topNServices = -1):
        "Filter the sorted services to find the most (topServices) similar ones"
        sortedServices = self.calc_similarity()

        result = []

        for i, (k, v) in enumerate(sortedServices):
            print("Ranking", i + 1, "Service ID:", k)
            for s in self.services.services:
                if s.id == k:
                    print('---------------------------------------------------------------------------------------')
                    print(s.currency, s.price, s.type, s.region, s.deployment, s.leasingPeriod, 'Features:', s.features)
                    print("Rating:", s.rating, "Euclidean", s.euclideanDistance, "Jaccard:", s.jaccardSimilarity,
                          "Cosine:", s.cosineSimilarity, "Manhattan:", s.manhattanDistance, "Pearson:",
                          s.pearsonCorrelation, "Minkowski:", s.minkowskiDistance)
                    print('---------------------------------------------------------------------------------------')
                    result.append(s.serialize(s.cosineSimilarity, s.jaccardSimilarity, s.euclideanDistance, s.manhattanDistance, s.pearsonCorrelation, json.dumps(s.weighted_similarity.tolist())))

        return {
            "recommendedServices": result if topNServices <= 0 else result[0:topNServices],
            "userIndex": self.customer.weighted_similarity.tolist()
        }
