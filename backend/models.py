from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
import string, datetime

metadata = MetaData(
    naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }
)
db = SQLAlchemy(metadata=metadata)


class Category(db.Model, SerializerMixin):
    __tablename__ = "category_table"
    serialize_rules = [
        "-transactions.category",
        "-budget_data.category",
        "-transactions.users",
        "-budget_data.users",
    ]
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    transactions = db.relationship("Transaction", back_populates="category")
    budget_data = db.relationship("Budget_Data", back_populates="category")


class User(db.Model, SerializerMixin):
    __tablename__ = "user_table"
    serialize_rules = [
        "-transactions.users",
        "-budget_data.user",
        "-user_data.users",
        "-transactions.category",
        "-budget_data.category",
    ]
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    password_hash = db.Column(db.String)
    transactions = db.relationship("Transaction", back_populates="users")
    budget_data = db.relationship("Budget_Data", back_populates="user")
    user_data = db.relationship("User_Data", back_populates="users")


class Transaction(db.Model, SerializerMixin):
    __tablename__ = "transaction_table"
    serialize_rules = ["-category.transactions", "-users.transactions", "-date.transaction"]
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    amount = db.Column(db.Integer)
    # date = db.Column(db.DateTime)
    category_id = db.Column(db.Integer, db.ForeignKey("category_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    date_id = db.Column(db.Integer, db.ForeignKey("date_table.id"))
    category = db.relationship("Category", back_populates="transactions")
    users = db.relationship("User", back_populates="transactions")
    date = db.relationship("Date", back_populates="transaction")

class Budget_Data(db.Model, SerializerMixin):
    __tablename__ = "budget_data_table"
    serialize_rules = ["-user.budget_data", "-category.budget_data", "-date.budget_data"]
    id = db.Column(db.Integer, primary_key=True)
    category_budget = db.Column(db.Integer)
    # date = db.Column(db.DateTime)
    category_id = db.Column(db.Integer, db.ForeignKey("category_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    date_id = db.Column(db.Integer, db.ForeignKey("date_table.id"))
    user = db.relationship("User", back_populates="budget_data")
    category = db.relationship("Category", back_populates="budget_data")
    date = db.relationship("Date", back_populates="budget_data")


class User_Data(db.Model, SerializerMixin):
    __tablename__ = "user_data_table"
    serialize_rules = ["-users.user_data", "-date.user_data"]
    id = db.Column(db.Integer, primary_key=True)
    # date = db.Column(db.DateTime)
    income = db.Column(db.Integer)
    savings = db.Column(db.Integer)
    budget = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey("user_table.id"))
    date_id = db.Column(db.Integer, db.ForeignKey("date_table.id"))
    users = db.relationship("User", back_populates="user_data")
    date = db.relationship("Date", back_populates="user_data")

class Date(db.Model, SerializerMixin):
    __tablename__ = "date_table"
    serialize_rules = ["-transaction.date", "-user_data.date", "-budget_data.date"]
    id = db.Column(db.Integer, primary_key=True)
    month = db.Column(db.String)
    transaction = db.relationship("Transaction", back_populates="date")
    user_data = db.relationship("User_Data", back_populates="date")
    budget_data = db.relationship("Budget_Data", back_populates="date")

