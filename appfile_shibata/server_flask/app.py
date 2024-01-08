from flask import Flask, request,  redirect, render_template,  jsonify
from flask_cors import CORS
from flask_login import UserMixin, LoginManager, login_user, logout_user, login_required
from control_db import  crud, mymodels
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_migrate import Migrate
from control_db.mymodels import Base
from openai import OpenAI
from openai import ChatCompletion
#from langchain import SQLDatabase, PromptTemplate, SQLDatabaseChain, OpenAI
#from langchain_community.document_loaders import JSONLoader
import json
from pathlib import Path
from pprint import pprint
from langchain_community.document_loaders import DataFrameLoader


app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = os.urandom(24)
migrate = Migrate(app, Base)
login_manager = LoginManager()
login_manager.init_app(app)

worker_id = "w001"

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




@app.route('/chat', methods=['POST'])
def chat():
    # フロントエンドからの会話履歴を取得します。
    conversation = request.json.get('conversation')
    #model = mymodels.Posts
    #result = crud.selectActivePosts(model)
    
    # OpenAIのAPIを使用してChatGPTに問い合わせます。
    client = OpenAI(
    api_key="YOUR API KEY"
    )
    model = mymodels.Posts
    df = crud.ActivePosts(model)

    loader = DataFrameLoader(df, page_content_column="post_id")
    duc = loader.load()

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=conversation  # 更新された会話履歴を使用
    )

    # ChatGPTからの応答をフロントエンドに返します。
    return jsonify({'response': response.choices[0].message.content})



@app.route("/activePosts")
def get_activePosts():
    model = mymodels.Posts
    result = crud.selectActivePosts(model)
    return result, 200


@app.route("/post_detail", methods=['GET'])
def read_one_post():
    target_id = request.args.get('post_id') #クエリパラメータ
    model = mymodels.Posts
    result = crud.selectPostDetail(model,target_id)
    return result, 200


@app.route("/post_status", methods=['GET'])
def read_one_ordeStatus():
    target_id = request.args.get('post_id') #クエリパラメータ
    model = mymodels.Workers_Posts
    result = crud.selectOrderStatus(model, target_id, worker_id)
    return result, 200


@app.route("/keywordSearch", methods=['GET'])
def get_searchPosts():
    target_word = request.args.get('keyword') #クエリパラメータ
    model = mymodels.Posts
    result = crud.KeywordPostSearch(model, target_word)
    return result, 200


@app.route("/worker", methods=['GET'])
def get_Worker():
    target_worker = request.args.get('worker_id') #クエリパラメータ
    model = mymodels.Workers
    result = crud.WorkerInfo(model, target_worker)
    return result, 200

@app.route("/company", methods=['GET'])
def get_Company():
    target_company = request.args.get('company_id') #クエリパラメータ
    model = mymodels.Companies
    result = crud.CompanyInfo(model, target_company)
    return result, 200

@app.route("/fb", methods=['GET'])
def get_MyFb():
    target_post = request.args.get('post_id') #クエリパラメータ
    model = mymodels.FeedBacks
    result = crud.FeedBack(model, target_post)
    return result, 200

@app.route("/fbs", methods=['GET'])
def get_MyFbs():
    target_worker = request.args.get('worker_id') #クエリパラメータ
    model = mymodels.FeedBacks
    result = crud.FeedBacks(model, target_worker)
    return result, 200

@app.route("/workerSkill", methods=['GET'])
def get_Myskill():
    target_worker = request.args.get('worker_id') #クエリパラメータ
    model1 = mymodels.Workers_Skills
    model2 = mymodels.Skills
    result = crud.WorkerSkill(model1, model2, target_worker)
    return result, 200

@app.route("/contract_list", methods=['GET'])
def get_Mycontract():
    target_worker = request.args.get('worker_id') #クエリパラメータ
    model1 = mymodels.Posts
    model2 = mymodels.Workers_Posts
    result = crud.MyContractList(model1, model2, target_worker)
    return result, 200


@app.route("/InsertOrder", methods=['POST'])
def Insert_order():
    data = request.get_json()

    # データが存在するか確認
    if 'post_id' in data:
        post_id = data['post_id']
        model = mymodels.Workers_Posts
        result = crud.InsertOrder(model, post_id, worker_id)
        # 成功した場合は応答を返す
        return jsonify({"success": True, "message": "Order inserted successfully."}), 200
    else:
        # エラー応答を返す（post_idが存在しない場合）
        print("受け取りでエラーになってる")
        return jsonify({"success": False, "message": "Invalid data format."}), 400


if __name__ == "__main__":
    app.run(debug=True)