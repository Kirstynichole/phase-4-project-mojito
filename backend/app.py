from flask import Flask, make_response, jsonify, request, session, g
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Category, User, Transaction, Budget_Data, User_Data, Date
from dotenv import dotenv_values
from flask_bcrypt import Bcrypt
import json
config = dotenv_values(".env")

app = Flask(__name__)
app.secret_key = config['FLASK_SECRET_KEY']
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

@app.get('/check_session')
def check_session():
    user = db.session.get(User, session.get('user_id'))
    print(f'check session {session.get("user_id")}')
    if user:
        return user.to_dict(rules=['-password_hash']), 200
    else:
        return {"message": "No user logged in"}, 401

@app.delete('/logout')
def logout():
    session.pop('user_id')
    return { "message": "Logged out"}, 200

@app.post('/login')
def login():
    print('login')
    data = request.json
    user = User.query.filter(User.name == data.get('name')).first()
    if user and bcrypt.check_password_hash(user.password_hash, data.get('password')):
        session["user_id"] = user.id
        print("success")
        return user.to_dict(), 200
    else:
        return { "error": "Invalid username or password" }, 401
    
@app.post('/user')
def post_user():
    data = request.json
    try:
        new_user = User(
            name= data.get("name"),
            password_hash= bcrypt.generate_password_hash(data.get("password_hash"))
        )
        db.session.add(new_user)
        db.session.commit()
        
        return new_user.to_dict(), 201
    except Exception as e:
        print(e)
        return {"error": f"could not post user: {e}"}, 405

@app.get('/categories')
def get_categories():
    categories = [category.to_dict() for category in Category.query.all()]
    return make_response( categories, 200 )

@app.get('/budgetdata')
def get_budget_data():
    budget_data = [budget_data.to_dict() for budget_data in Budget_Data.query.filter_by(user_id=session['user_id']).all()]
    return make_response( budget_data, 200 )

@app.get('/budgetdata/<int:id>')
def get_budget_id(id):
    budget_data = db.session.get(Budget_Data, id)
    if not budget_data:
        return {"error": f"budget data with id {id} not found"}, 404
    return budget_data.to_dict()

@app.get('/userdata')
def get_user_data():
    user_data = User_Data.query.filter_by(user_id=session.get('user_id')).first().to_dict()
    return make_response( user_data, 200 )

@app.get('/transactiondata')
def get_transaction_data():
    transaction_data = [transaction_data.to_dict() for transaction_data in Transaction.query.filter_by(user_id=session.get('user_id')).order_by(Transaction.id.desc()).all()]
    return make_response( transaction_data, 200 )

@app.get('/transactiondata/<string:filteredMonth>')
def get_filtered_transaction_data(filteredMonth):
    transaction_data = [transaction_data.to_dict() for transaction_data in Transaction.query.filter_by(user_id=session.get('user_id'), date_id=filteredMonth).order_by(Transaction.id.desc()).all()]
    return make_response( transaction_data, 200 )

@app.get('/dates')
def get_dates():
    dates = [date.to_dict() for date in Date.query.all()]
    return make_response(dates, 200)

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
    
@app.post('/transactiondata')
def post_transaction_data():
    data = request.json
    try:
        new_transaction_data = Transaction(
            name = data.get("name"),
            amount = data.get("amount"),
            category_id = data.get("category_id"),
            user_id = data.get("user_id"),
            date_id = data.get("date_id")
        )

        db.session.add(new_transaction_data)
        db.session.commit()
        
        return new_transaction_data.to_dict(), 201
    except Exception as e:
        print(e)
        return {"error": f"could not post transaction data: {e}"}, 405
    
@app.delete("/transactiondata/<int:id>")
def delete_transaction_data(id):
    transaction_data = db.session.get(Transaction, id)
    if not transaction_data:
        return {"error": f"transaction data with id {id} not found"}, 404
    db.session.delete(transaction_data)
    db.session.commit()
    return {}, 202

@app.delete("/budgetdata/<int:id>")
def delete_budget_data(id):
    budget_data = db.session.get(Budget_Data, id)
    if not budget_data:
        return {"error": f"budget data with id {id} not found"}, 404
    db.session.delete(budget_data)
    db.session.commit()
    return {}, 202

@app.patch("/budgetdata/<int:id>")
def patch_budget_data(id):
    budget_data = db.session.get(Budget_Data, id)
    if not budget_data:
        return {"error": f"budget data for id {id} not found"}, 404
    try:
        data = request.json
        for key in data:
            setattr(budget_data, key, data[key])
        db.session.add(budget_data)
        db.session.commit()
        return budget_data.to_dict(), 200
    except Exception as e:
        return {"error": f'{e}'}

if __name__ == "__main__":
    app.run(port=5555, debug=True)