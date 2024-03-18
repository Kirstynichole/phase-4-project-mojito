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
    __tablename__ = 'category_table'

    serialize_rules = []

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    transactions = db.relationship('Transaction', back_populates='categories')
    budget_data = db.relationship('Budget_Data', back_populates='categories')

class User(db.Model, SerializerMixin):
    __tablename__ = 'user_table'

    serialize_rules = []

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    transactions = db.relationship('Transaction', back_populates='users')
    budget_data = db.relationship('Budget_Data', back_populates='users')
    user_data = db.relationship('User_Data', back_populates='users')

class Transaction(db.Model, SerializerMixin):
    __tablename__ = 'transaction_table'

    serialize_rules = []

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    amount = db.Column(db.Integer)
    # date = db.Column(db.String)
    category_id = db.Column(db.Integer, db.ForeignKey('category_table.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))
    
    categories = db.relationship('Category', back_populates='transactions')
    users = db.relationship('User', back_populates='transactions')

class Budget_Data(db.Model, SerializerMixin):
    __tablename__ = 'budget_data_table'

    serialize_rules = []

    id = db.Column(db.Integer, primary_key=True)
    category_budget = db.Column(db.Integer)
    # date = db.Column(db.String)
    category_id = db.Column(db.Integer, db.ForeignKey('category_table.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))

    users = db.relationship('User', back_populates='budget_data')
    categories = db.relationship('Category', back_populates='budget_data')

class User_Data(db.Model, SerializerMixin):
    __tablename__ = 'user_data_table'

    serialize_rules = ["-user_table.user_data_table"]

    id = db.Column(db.Integer, primary_key=True)
    # date = db.Column(db.String)
    income = db.Column(db.Integer)
    savings = db.Column(db.Integer)
    budget = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user_table.id'))

    users = db.relationship('User', back_populates='user_data')


