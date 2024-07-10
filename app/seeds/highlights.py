from app.models import db, Highlight, environment, SCHEMA
from sqlalchemy.sql import text

highlight_data = [
    {
        "video_id": 1,
        "title": "Importance of Debugging",
        "start_time": 30,
        "end_time": 60,
    },
    {
        "video_id": 1,
        "title": "Key Debugging Tools",
        "start_time": 70,
        "end_time": 110,
    },
    {
        "video_id": 2,
        "title": "Effective Study Techniques",
        "start_time": 20,
        "end_time": 50,
    },
    {
        "video_id": 2,
        "title": "Benefits of Lo-fi Hip Hop",
        "start_time": 60,
        "end_time": 90,
    },
    {
        "video_id": 3,
        "title": "Introduction to HTML",
        "start_time": 10,
        "end_time": 40,
    },
    {
        "video_id": 3,
        "title": "Building a Basic Webpage",
        "start_time": 50,
        "end_time": 80,
    },
    {
        "video_id": 4,
        "title": "CSS Selectors Overview",
        "start_time": 15,
        "end_time": 45,
    },
    {
        "video_id": 4,
        "title": "Responsive Design Principles",
        "start_time": 55,
        "end_time": 85,
    },
    {
        "video_id": 5,
        "title": "JavaScript Syntax Basics",
        "start_time": 25,
        "end_time": 55,
    },
    {
        "video_id": 5,
        "title": "DOM Manipulation Techniques",
        "start_time": 65,
        "end_time": 95,
    },
    {
        "video_id": 6,
        "title": "Introduction to Python",
        "start_time": 35,
        "end_time": 65,
    },
    {
        "video_id": 6,
        "title": "Common Python Libraries",
        "start_time": 75,
        "end_time": 105,
    },
    {
        "video_id": 7,
        "title": "Understanding React Components",
        "start_time": 20,
        "end_time": 50,
    },
    {
        "video_id": 7,
        "title": "Managing State in React",
        "start_time": 60,
        "end_time": 90,
    },
    {
        "video_id": 8,
        "title": "Node.js Basics Explained",
        "start_time": 30,
        "end_time": 60,
    },
    {
        "video_id": 8,
        "title": "Introduction to Express",
        "start_time": 70,
        "end_time": 100,
    },
    {
        "video_id": 9,
        "title": "Creating RESTful APIs",
        "start_time": 25,
        "end_time": 55,
    },
    {
        "video_id": 9,
        "title": "Performing CRUD Operations",
        "start_time": 65,
        "end_time": 95,
    },
    {
        "video_id": 10,
        "title": "Overview of Django",
        "start_time": 40,
        "end_time": 70,
    },
    {
        "video_id": 10,
        "title": "Defining Models in Django",
        "start_time": 80,
        "end_time": 110,
    },
    {
        "video_id": 11,
        "title": "Docker Basics Overview",
        "start_time": 15,
        "end_time": 45,
    },
    {
        "video_id": 11,
        "title": "Using Docker Compose",
        "start_time": 55,
        "end_time": 85,
    },
    {
        "video_id": 12,
        "title": "Git Basics Explained",
        "start_time": 35,
        "end_time": 65,
    },
    {
        "video_id": 12,
        "title": "Understanding GitHub Workflow",
        "start_time": 75,
        "end_time": 105,
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
