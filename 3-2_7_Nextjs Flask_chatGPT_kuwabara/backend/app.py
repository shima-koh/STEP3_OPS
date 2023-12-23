from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# ここにOpenAIのAPIキーを設定します。
openai.api_key = 'Your API KEY'

@app.route('/chat', methods=['POST'])
def chat():
    # フロントエンドからの会話履歴を取得します。
    conversation = request.json.get('conversation')
    
    # OpenAIのAPIを使用してChatGPTに問い合わせます。
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=conversation  # 更新された会話履歴を使用
    )
    
    # ChatGPTからの応答をフロントエンドに返します。
    return jsonify({'response': response.choices[0].message['content']})


if __name__ == '__main__':
    app.run(debug=True)
