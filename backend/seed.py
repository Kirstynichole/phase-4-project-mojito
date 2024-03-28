from random import choice as rc
import random
import math

from faker import Faker

from app import app
from models import db, Category, User, Transaction, Budget_Data, User_Data, Date
from flask_bcrypt import Bcrypt

fake = Faker()

def seed_date_table():
    months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    for month in months:
        # print(month)
        existing_date = Date.query.filter_by(month=month).first()
        # print(existing_date)
        if existing_date is None:
            new_date = Date(month=month)
            # print(new_date)
            db.session.add(new_date)
            # print("yay")
    db.session.commit()

with app.app_context():

    bcrypt = Bcrypt(app)
    data = {}
    
    Category.query.delete()
    User.query.delete()
    Transaction.query.delete()
    Budget_Data.query.delete()
    User_Data.query.delete()
    Date.query.delete()

    # # populate table with users
    # users = []
    # for n in range(1):
    #     user = User(name=fake.name())
    #     users.append(user)
    # db.session.add_all(users)

    # populate table with categories
    category_instances = []
    categories = ['Home', 'Utilities', 'Groceries', 'Restaurants', 'Transportation', 'Car', 'Insurance', 'Shopping', 'Vacation', 'Pet', 'Phone', 'Subscriptions', 'Entertainment', 'Charity', 'Household Supplies']
    for category in categories:
        c = Category(name=category)
        category_instances.append(c)
    db.session.add_all(category_instances)

    # populate table with transactions
    transactions = []
    for n in range(1):
        transaction = Transaction(name=fake.company(), amount=random.randint(1, 1000), category_id=random.randint(1, len(categories)), user_id=1)
        transactions.append(transaction)
    db.session.add_all(transactions)

    # populate table with budget_data
    budgets = []
    for n in range(1):
        budget = Budget_Data(category_budget=random.randint(1000,10000), category_id=random.randint(1, len(categories)), user_id=1)
        budgets.append(budget)
    db.session.add_all(budgets)

    #populate table with user_data
    users_data = []
    for n in range(1):
        income = random.randint(10000, 100000)
        savings = math.floor(income * 0.1)
        budget = income - savings
        user_data = User_Data(income=income, savings=savings, budget=budget, user_id=1)
        users_data.append(user_data)
    db.session.add_all(users_data)

    seed_date_table()
    # months, date_instances = [
    #     "January", "February", "March", "April", "May", "June",
    #     "July", "August", "September", "October", "November", "December"
    # ], []
    # for month in months:
    #     date_instance = Date(month=month)
    #     date_instances.append(date_instance)
    # db.session.add_all(date_instances)

    db.session.add(User(name="a", password_hash=bcrypt.generate_password_hash("a")))
    db.session.add(User(name="b", password_hash=bcrypt.generate_password_hash("b")))
    
    db.session.commit()

print("seeding complete")
