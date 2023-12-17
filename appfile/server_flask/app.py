from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

stores = [
    {
        "name": "Store1",
        "items": [
            {
                "name": "Chair",
                "price": 18.99
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

@app.route("/store")
def get_stores():
    return {"stores": stores}


if __name__ == "__main__":
    app.run(debug=True)