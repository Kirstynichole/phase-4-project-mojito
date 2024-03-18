from flask import Flask, make_response, jsonify, request, session, g
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Category, User, Transaction, Budget_Data, User_Data
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt
import json
# config = dotenv_values(".env")

app = Flask(__name__)
# app.secret_key = config['FLASK_SECRET_KEY']
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

db.init_app(app)


@app.route("/")
def root():
    return "<h1>Welcome to the simple json server<h1>"

@app.before_request
def load_data():
    with open("db.json") as f:
        g.data = json.load(f)


@app.after_request
def save_data(response):
    with open('db.json', 'w') as f:
        json.dump(g.data, f, indent=4)
    return response

if __name__ == "__main__":
    app.run(port=5555, debug=True)