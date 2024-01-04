from flask import Flask, request,  redirect, render_template,  jsonify
from flask_cors import CORS
from flask_login import UserMixin, LoginManager, login_user, logout_user, login_required
from control_db import  crud, mymodels
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_migrate import Migrate
from control_db.mymodels import Base

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.urandom(24)
migrate = Migrate(app, Base)

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


login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    db = mymodels.SessionLocal()
    user = db.query(mymodels.Workers).get(user_id)
    db.close()
    return user

# ログイン処理
@app.route('/login', methods=['POST'])
def login():

    data = request.json
    worker_id = data.get('worker_id')
    worker_pw = data.get('worker_pw')

    db = mymodels.SessionLocal()
    #user = db.query(mymodels.Workers).filter(mymodels.Workers.worker_id == worker_id, mymodels.Workers.worker_pw == worker_pw).first()
    user = {
                'worker_id': 12345,
                'worker_password': "password",
            }
    db.close()

    if user:
        # ログイン成功
        return jsonify({
            'isLoggedIn': True,
            'user': {
                'worker_id': user.worker_id,
                'worker_name': user.worker_name,
            }
        })
    else:
        # ログイン失敗
        return jsonify({
            'isLoggedIn': False,
        })



# サインイン処理
@app.route('/signin', methods=['GET', 'POST'])
def signin():
    # サインインの処理をここに実装
    # ...
    return 200


# ログアウト処理
@app.route('/logout')
def logout():
    logout_user()
    return jsonify({'isLoggedIn': False,})


@app.route("/activePosts")
def get_activePosts():
    model = mymodels.Posts
    result = crud.selectActivePosts(model)
    return result, 200


@app.route("/post_detail", methods=['GET'])
def read_one_post():
    target_id = request.args.get('post_id') #クエリパラメータ
    result = DetailData
    return result, 200


if __name__ == "__main__":
    app.run(debug=True)