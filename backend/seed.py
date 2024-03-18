from random import choice as rc
import random
import math

from faker import Faker

from app import app
from models import db, Category, User, Transaction, Budget_Data, User_Data
from flask_bcrypt import Bcrypt

fake = Faker()

with app.app_context():

    bcrypt = Bcrypt(app)
    data = {}
    
    Category.query.delete()
    User.query.delete()
    Transaction.query.delete()
    Budget_Data.query.delete()
    User_Data.query.delete()

    # populate table with users
    users = []
    for n in range(5):
        user = User(name=fake.name())
        users.append(user)
    db.session.add_all(users)

    # populate table with categories
    category_instances = []
    categories = ['Home', 'Utilities', 'Groceries', 'Restaurants', 'Transportation', 'Car', 'Insurance', 'Shopping', 'Vacation', 'Pet', 'Phone', 'Subscriptions', 'Entertainment', 'Charity', 'Household Supplies']
    for category in categories:
        c = Category(name=category)
        category_instances.append(c)
    db.session.add_all(category_instances)

    # populate table with transactions
    transactions = []
    for n in range(25):
        transaction = Transaction(name=fake.company(), amount=random.randint(1, 1000), category_id=random.randint(1, len(categories)), user_id=random.randint(1, 5))
        transactions.append(transaction)
    db.session.add_all(transactions)

    # populate table with budget_data
    budgets = []
    for n in range(50):
        budget = Budget_Data(category_budget=random.randint(1000,10000), category_id=random.randint(1, len(categories)), user_id=random.randint(1, 5))
        budgets.append(budget)
    db.session.add_all(budgets)

    #populate table with user_data
    users_data = []
    for n in range(5):
        income = random.randint(10000, 100000)
        savings = math.floor(income * 0.1)
        budget = income - savings
        user_data = User_Data(income=income, savings=savings, budget=budget, user_id=random.randint(1, 5))
        users_data.append(user_data)
    db.session.add_all(users_data)

    db.session.commit()
