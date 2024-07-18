from app.models import db, Highlight, environment, SCHEMA
from sqlalchemy.sql import text

highlight_data = [
    {
        "video_id": 1,
        "title": "Secret to Perfect Pasta",
        "start_time": 30,
        "end_time": 60,
    },
    {
        "video_id": 1,
        "title": "How to Choose Your Pasta",
        "start_time": 70,
        "end_time": 110,
    },
    {
        "video_id": 2,
        "title": "Understanding Climate Change",
        "start_time": 20,
        "end_time": 50,
    },
    {
        "video_id": 2,
        "title": "Effects on Ecosystems",
        "start_time": 60,
        "end_time": 90,
    },
    {
        "video_id": 3,
        "title": "History of Ancient Music",
        "start_time": 10,
        "end_time": 40,
    },
    {
        "video_id": 3,
        "title": "Modern Music Evolution",
        "start_time": 50,
        "end_time": 80,
    },
    {
        "video_id": 4,
        "title": "Basic Yoga Poses",
        "start_time": 15,
        "end_time": 45,
    },
    {
        "video_id": 4,
        "title": "Breathing Techniques",
        "start_time": 55,
        "end_time": 85,
    },
    {
        "video_id": 5,
        "title": "Quantum Mechanics Intro",
        "start_time": 5,
        "end_time": 35,
    },
    {
        "video_id": 5,
        "title": "Quantum Entanglement",
        "start_time": 45,
        "end_time": 75,
    },
    {
        "video_id": 6,
        "title": "Key Baking Ingredients",
        "start_time": 25,
        "end_time": 55,
    },
    {
        "video_id": 6,
        "title": "Kneading Dough Techniques",
        "start_time": 65,
        "end_time": 95,
    },
    {
        "video_id": 7,
        "title": "Essential Camera Settings",
        "start_time": 30,
        "end_time": 60,
    },
    {
        "video_id": 7,
        "title": "Composition Techniques",
        "start_time": 70,
        "end_time": 100,
    },
    {
        "video_id": 8,
        "title": "Early Internet History",
        "start_time": 20,
        "end_time": 50,
    },
    {
        "video_id": 8,
        "title": "Internet Milestones",
        "start_time": 60,
        "end_time": 90,
    },
    {
        "video_id": 9,
        "title": "Digestive System Anatomy",
        "start_time": 10,
        "end_time": 40,
    },
    {
        "video_id": 9,
        "title": "Digestive Process Stages",
        "start_time": 50,
        "end_time": 80,
    },
    {
        "video_id": 10,
        "title": "Basic Guitar Chords",
        "start_time": 5,
        "end_time": 35,
    },
    {
        "video_id": 10,
        "title": "Strumming Patterns",
        "start_time": 45,
        "end_time": 75,
    },
    {
        "video_id": 11,
        "title": "Overview of Solar System",
        "start_time": 15,
        "end_time": 45,
    },
    {
        "video_id": 11,
        "title": "Characteristics of Planets",
        "start_time": 55,
        "end_time": 85,
    },
    {
        "video_id": 12,
        "title": "Common Spices in Cooking",
        "start_time": 25,
        "end_time": 55,
    },
    {
        "video_id": 12,
        "title": "Creating Spice Blends",
        "start_time": 65,
        "end_time": 95,
    },
    {
        "video_id": 13,
        "title": "Python Programming Basics",
        "start_time": 10,
        "end_time": 40,
    },
    {
        "video_id": 13,
        "title": "Writing Python Functions",
        "start_time": 50,
        "end_time": 80,
    },
    {
        "video_id": 14,
        "title": "Benefits of Meditation",
        "start_time": 5,
        "end_time": 35,
    },
    {
        "video_id": 14,
        "title": "Meditation Techniques",
        "start_time": 45,
        "end_time": 75,
    },
    {
        "video_id": 15,
        "title": "Fundamentals of AI",
        "start_time": 20,
        "end_time": 50,
    },
    {
        "video_id": 15,
        "title": "AI Applications",
        "start_time": 60,
        "end_time": 90,
    }
]


# Adds a demo highlight, you can add other highlights here if you want
def seed_highlights():
    for highlight in highlight_data:
        db.session.add(Highlight(**highlight))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the highlights table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_highlights():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.highlights RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM highlights"))

    db.session.commit()
