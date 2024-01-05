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
from langchain import SQLDatabase, PromptTemplate, SQLDatabaseChain, OpenAI
from langchain_community.document_loaders import JSONLoader

import json
from pathlib import Path
from pprint import pprint


app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.urandom(24)
migrate = Migrate(app, Base)

login_manager = LoginManager()
login_manager.init_app(app)

# 最新のAPIキーを取得します。
#api_key = os.environ.get('OPENAI_API_KEY')

# ChatCompletionクラスをインスタンス化します。



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

    print(conversation)

    model = mymodels.Posts
    result = crud.selectActivePosts(model)
    
    # OpenAIのAPIを使用してChatGPTに問い合わせます。
    client = OpenAI(
    api_key="YOUR API KEY"
)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=conversation  # 更新された会話履歴を使用
    )
    
    print(response)

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
    print(target_id)
    model = mymodels.Posts
    result = crud.selectPostDetail(model,target_id)

    print(result)
    return result, 200

@app.route("/keywordSearch", methods=['GET'])
def get_searchPosts():
    target_word = request.args.get('keyword') #クエリパラメータ
    print(target_word+"でCRUD実行")
    model = mymodels.Posts
    result = crud.KeywordPostSearch(model, target_word)

    print("結果："+ result)
    return result, 200



if __name__ == "__main__":
    app.run(debug=True)