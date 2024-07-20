from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

tag_data = [
    "Tutorial",
    "Vlog",
    "Entertainment",
    "Education",
    "Lifestyle",
    "Technology",
    "Science",
    "Travel",
    "Music",
    "Gaming",
    "Sports",
    "News",
    "Comedy",
    "Food",
    "Beauty",
    "Fashion",
    "Health",
    "Fitness",
    "Nature",
]

# Adds a demo user, you can add other tags here if you want
def seed_tags():
    for tag in tag_data:
        db.session.add(Tag(name=tag))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the tags table. SQLAlchemy doesn't have a built in function to do this. With postgres in production TRUNCATE removes all the data from the table, and RESET IDENTITY resets the auto incrementing primary key, CASCADE deletes any dependent entities.  With sqlite3 in development you need to instead use DELETE to remove all data and it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
