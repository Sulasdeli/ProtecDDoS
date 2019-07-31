import numpy as np
from engine.helpers.similarity_functions import euclidean_distance, jaccard_similarity, cosine_similarity,\
    manhattan_distance, pearson_correlation, minkowski_distance
import json


class RecEngine:
    """Recommendation Engine"""

    def __init__(self, service_helper, customer):
        self.service_helper = service_helper
        self.customer = customer

    def calc_customer_index(self):
        """Computes the total index of a given customer profile"""
        cs = self.customer
        sh = self.service_helper
        deployment_time_index = sh.calculate_index(sh.deployment_dict, cs.deploymentTime)
        leasing_period_index = sh.calculate_index(sh.leasing_dict, cs.leasingPeriod)
        cs.total_index = [deployment_time_index, leasing_period_index, cs.budget]

    def calc_service_index(self):
        """Computes the total index of each protection service"""
        sh = self.service_helper
        for s in sh.services:
            deployment_time_index = sh.calculate_index(sh.deployment_dict, s.deployment)
            leasing_period_index = sh.calculate_index(sh.leasing_dict, s.leasingPeriod)
            s.total_index = [deployment_time_index, leasing_period_index, self.customer.budget - s.price]

    def calc_similarity(self):
        """Computes the similarity score between customer and a list of services and returns a list of services, sorted by relevance"""
        sh = self.service_helper
        cs = self.customer

        #Store similarities per service --> (service id : ranking)
        similarity = {}

        # assign an int to each characteristic
        self.calc_customer_index()
        self.calc_service_index()

        customer_profile_weights = [cs.deploymentTimeWeight, cs.leasingPeriodWeight, cs.budgetWeight]

        # Customer definitions/requirements
        cs.weighted_total_index = np.multiply(cs.total_index, customer_profile_weights)

        for s in sh.services:
            s.weighted_total_index = np.multiply(s.total_index, customer_profile_weights)

            # Calculation of Similarity
            s.euclideanDistance = euclidean_distance(cs.weighted_total_index, s.weighted_total_index)     #lower -> better
            s.jaccardSimilarity = jaccard_similarity(cs.weighted_total_index, s.weighted_total_index)     #higher -> better
            s.cosineSimilarity = cosine_similarity(cs.weighted_total_index, s.weighted_total_index)       #higher -> better
            s.manhattanDistance = manhattan_distance(cs.weighted_total_index, s.weighted_total_index)     #lower -> better
            s.pearsonCorrelation = pearson_correlation(cs.weighted_total_index, s.weighted_total_index)   #higher -> better
            s.minkowskiDistance = minkowski_distance(cs.weighted_total_index, s.weighted_total_index, len(s.weighted_total_index)) #higher -> better

            #Rating is given based on a normalization of all ratings
            s.rating = np.linalg.norm([s.euclideanDistance, s.jaccardSimilarity, s.cosineSimilarity, s.manhattanDistance, s.pearsonCorrelation, s.minkowskiDistance])
            similarity.update({s.id: s.rating})

        #Sort services by similarity index
        sorted_normalized_similarities = [(k, similarity[k]) for k in sorted(similarity, key=similarity.get)]

        return sorted_normalized_similarities

    def recommend_services(self, topNServices = -1):
        """Filter the sorted services to find the most (topServices) similar ones"""
        sorted_services = self.calc_similarity()

        result = []

        for i, (k, v) in enumerate(sorted_services):
            print("Ranking", i + 1, "Service ID:", k)
            for s in self.service_helper.services:
                if s.id == k:
                    print('---------------------------------------------------------------------------------------')
                    print(s.currency, s.price, s.type, s.region, s.deployment, s.leasingPeriod, 'Features:', s.features)
                    print("Rating:", s.rating, "Euclidean", s.euclideanDistance, "Jaccard:", s.jaccardSimilarity,
                          "Cosine:", s.cosineSimilarity, "Manhattan:", s.manhattanDistance, "Pearson:",
                          s.pearsonCorrelation, "Minkowski:", s.minkowskiDistance)
                    print('---------------------------------------------------------------------------------------')
                    result.append(s.serialize(s.cosineSimilarity, s.jaccardSimilarity, s.euclideanDistance, s.manhattanDistance, s.pearsonCorrelation, json.dumps(s.weighted_total_index.tolist())))

        return {
            "recommendedServices": result if topNServices <= 0 else result[0:topNServices],
            "userIndex": self.customer.weighted_total_index.tolist()
        }
