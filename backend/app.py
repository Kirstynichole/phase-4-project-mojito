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

@app.get('/categories')
def get_categories():
    categories = [category.to_dict() for category in Category.query.all()]
    return make_response( categories, 200 )

@app.get('/budgetdata')
def get_budget_data():
    budget_data = [budget_data.to_dict() for budget_data in Budget_Data.query.filter_by(user_id=1).all()]
    return make_response( budget_data, 200 )

@app.get('/userdata')
def get_user_data():
    user_data = User_Data.query.filter_by(user_id=2).first().to_dict()
    return make_response( user_data, 200 )

@app.post('/budgetdata')
def post_budget_data():
    data = request.json
    try:
        new_budget_data = Budget_Data(
            category_budget= data.get("category_budget"),
            category_id= data.get("category_id"),
            user_id= data.get("user_id"),
        )

        db.session.add(new_budget_data)
        db.session.commit()
        
        return new_budget_data.to_dict(), 201
    except Exception as e:
        print(e)
        return {"error": f"could not post budget data: {e}"}, 405
    
@app.post('/userdata')
def post_user_data():
    data = request.json
    try:
        new_user_data = User_Data(
            income= data.get("income"),
            savings= data.get("savings"),
            budget=data.get("budget"),
            user_id= data.get("user_id"),
        )

        db.session.add(new_user_data)
        db.session.commit()
        
        return new_user_data.to_dict(), 201
    except Exception as e:
        print(e)
        return {"error": f"could not post user data: {e}"}, 405

if __name__ == "__main__":
    app.run(port=5555, debug=True)