from schema import Schema, And, Use
from werkzeug.datastructures import FileStorage

recommend_provider_schema = Schema({'serviceId': And(Use(int)),
                                    'file':  And(Use(FileStorage)),
                                    'rating':  And(Use(int)),
                                    'comment': And(Use(str))
                                    })
