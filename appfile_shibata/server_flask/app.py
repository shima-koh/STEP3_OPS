from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

stores = [
    {
        "name": "Store1",
        "items": [
            {
                "name": "Chair",
                "price": 23.99
            }
        ]
    },
    {
        "name": "Store2",
        "items": [
            {
                "name": "Leon",
                "price": 12.99
            }
        ]
    }
]

postData = [
        {
        "postId" : 1,
        "imageUrl" : 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG61eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcH8XpJFUiwn81vFiIu__54ya1eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcHg2TUWon14TQrPwboFlQOaA==/iStock-1330168808-2-1024x683.jpg?errorImage=false',
        "date_posted": '2023-01-01T12:34:56Z', 
        "title": 'Sample Title',
        "summary": 'This is a sample summary.',
        },
        {
            "postId": 2,
            "imageUrl": 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG61eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcH8XpJFUiwn81vFiIu__54ya1eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcHg2TUWon14TQrPwboFlQOaA==/iStock-1330168808-2-1024x683.jpg?errorImage=false',
            "date_posted": '2023-01-01T12:34:56Z', 
            "title": 'Sample Title2',
            "summary": 'This is a sample summary.',
            },
        {
            "postId": 3,
            "imageUrl": 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG2ZbYGCyLpR5USnqNmgnrubG2eS9ra12f_cClqxFaU7sEVqSRX-bm7hsp208PQC780lNsE_Q6Zpk-Mc-TnctCKrRsT4BHw4vJBdyY7ak9s7DRpXI8zagw7M7s6pqkyURoHHaMywbr_BMmlTun-_KYV6wLsE3uha-6yaPxWI4vhYeWgKndumajZFiDs_DmVOSzUNwjXlNmeEcl5o10d8l38sEQrvx7DGkPOvn4HfbnSAi/761.jpg?errorImage=false',
            "date_posted": '2023-01-01T12:34:56Z',  
            "title": 'Sample Titl3',
            "summary": 'This is a sample summary.',
        },
        {
            "postId": 4,
            "imageUrl": 'https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG61eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcH8XpJFUiwn81vFiIu__54ya1eV0xpn3J-qY9dzbEBTY3-tVDhZIlmYVTEJzKEl3SCaZvSqKPO5yMG3iHmd2MyqucCQOvfr_Nh4TywJ08lN0UIsd0nvocRWGwff7Q7Iu_JLwBtCq6mG6blRNSiQudyu2c4TZ1jvGYK3PSd-9m8Ii6JHyKrgJfQVtfhZLwPF8U05acTj9J_yZLYOd59k2aCn05KGqMGhDi8X6A_JnYvvyEh1HXxmGKoA4LqubthCYcHg2TUWon14TQrPwboFlQOaA==/iStock-1330168808-2-1024x683.jpg?errorImage=false',
            "date_posted": '2023-01-01T12:34:56Z',  
            "title": 'Sample Title4',
            "summary": 'This is a sample summary.',
        },
    ]

DetailData = {
        "postId" : 1,
        "postedBy" : "CorpName",
        "status": "Order",
        "dueDay": "2023-01-09T12:34:56Z",
        "date_posted": '2023-01-01T12:34:56Z', 
        "title": 'Sample Title',
        "summary": 'This is a sample summary.',
        "requiredSkill": 'React, Nextjs,......',
        }

@app.route("/store")
def get_stores():
    return {"stores": stores}


@app.route("/activePosts")
def get_activePosts():
    return {"activePosts": postData}


@app.route("/post_detail", methods=['GET'])
def read_one_post():
    target_id = request.args.get('post_id') #クエリパラメータ
    result = DetailData
    return result, 200


if __name__ == "__main__":
    app.run(debug=True)