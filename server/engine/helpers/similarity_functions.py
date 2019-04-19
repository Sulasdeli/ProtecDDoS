import numpy as np


def square_rooted(x):
    return np.sqrt(sum([a * a for a in x]))


def cosine_similarity(x, y):
    numerator = sum(a*b for a, b in zip(x, y))
    denominator = square_rooted(x)*square_rooted(y)
    return numerator/float(denominator)


def jaccard_similarity(x, y):
    intersection_cardinality = len(set.intersection(*[set(x), set(y)]))
    union_cardinality = len(set.union(*[set(x), set(y)]))
    return intersection_cardinality/float(union_cardinality)


def euclidean_distance(x, y):
    return np.sqrt(sum(pow(a-b, 2) for a, b in zip(x, y)))


def manhattan_distance(x, y):
    return sum(abs(a-b) for a, b in zip(x, y))
