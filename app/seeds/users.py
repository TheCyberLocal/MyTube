from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

user_data = [
    {
        "username": "Demo",
        "name": "Danny",
        "email": "demo@aa.io",
        "password": "password"
    },
    {
        "username": "marie233",
        "name": "Marie",
        "email": "marie@aa.io",
        "password": "password"
    },
    {
        "username": "bobbie878",
        "name": "Bobby",
        "email": "bobbie@aa.io",
        "password": "password"
    }
]

# Adds a demo user, you can add other users here if you want
def seed_users():
    for user in user_data:
        db.session.add(User(**user))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
