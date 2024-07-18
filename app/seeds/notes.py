from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text


note_data = [
    {
        "video_id": 1,
        "title": "Pasta Ingredients",
        "description": "Understand the importance of selecting high-quality ingredients for making perfect pasta."
    },
    {
        "video_id": 1,
        "title": "Cooking Time",
        "description": "Learn how to determine the optimal cooking time for different types of pasta."
    },
    {
        "video_id": 2,
        "title": "Climate Change Basics",
        "description": "Get to know the fundamental concepts of climate change and its causes."
    },
    {
        "video_id": 2,
        "title": "Impact on Ecosystems",
        "description": "Learn about the effects of climate change on various ecosystems around the world."
    },
    {
        "video_id": 3,
        "title": "History of Music",
        "description": "Explore the origins and evolution of music from ancient times to the present."
    },
    {
        "video_id": 3,
        "title": "Influential Genres",
        "description": "Understand the impact of different music genres on society and culture."
    },
    {
        "video_id": 4,
        "title": "Yoga Poses",
        "description": "Learn about the basic yoga poses and how to perform them correctly."
    },
    {
        "video_id": 4,
        "title": "Breathing Techniques",
        "description": "Understand the importance of breathing techniques in yoga practice."
    },
    {
        "video_id": 5,
        "title": "Quantum Mechanics",
        "description": "Get an introduction to the fundamental concepts of quantum mechanics."
    },
    {
        "video_id": 5,
        "title": "Quantum Entanglement",
        "description": "Learn about the phenomenon of quantum entanglement and its implications."
    },
    {
        "video_id": 6,
        "title": "Baking Ingredients",
        "description": "Discover the key ingredients needed for baking perfect bread."
    },
    {
        "video_id": 6,
        "title": "Kneading Techniques",
        "description": "Learn the proper kneading techniques to develop gluten in bread dough."
    },
    {
        "video_id": 7,
        "title": "Camera Settings",
        "description": "Understand the essential camera settings for digital photography."
    },
    {
        "video_id": 7,
        "title": "Composition Tips",
        "description": "Learn tips for composing visually appealing photographs."
    },
    {
        "video_id": 8,
        "title": "Internet History",
        "description": "Explore the history of the internet from its inception to the modern era."
    },
    {
        "video_id": 8,
        "title": "Internet Milestones",
        "description": "Learn about the key milestones and technological advancements in the development of the internet."
    },
    {
        "video_id": 9,
        "title": "Digestive System Anatomy",
        "description": "Get an overview of the anatomy of the human digestive system."
    },
    {
        "video_id": 9,
        "title": "Digestive Process",
        "description": "Learn about the stages of the digestive process and how nutrients are absorbed."
    },
    {
        "video_id": 10,
        "title": "Basic Guitar Chords",
        "description": "Learn the basic chords needed to start playing the guitar."
    },
    {
        "video_id": 10,
        "title": "Strumming Patterns",
        "description": "Discover different strumming patterns to enhance your guitar playing."
    },
    {
        "video_id": 11,
        "title": "Solar System Overview",
        "description": "Get an overview of the solar system and its main components."
    },
    {
        "video_id": 11,
        "title": "Planetary Characteristics",
        "description": "Learn about the unique characteristics of each planet in the solar system."
    },
    {
        "video_id": 12,
        "title": "Common Spices",
        "description": "Discover common spices used in cooking and their flavor profiles."
    },
    {
        "video_id": 12,
        "title": "Spice Blends",
        "description": "Learn how to create your own spice blends to enhance your dishes."
    },
    {
        "video_id": 13,
        "title": "Python Basics",
        "description": "Get an introduction to the basics of programming with Python."
    },
    {
        "video_id": 13,
        "title": "Writing Python Functions",
        "description": "Learn how to write functions in Python to create reusable code."
    },
    {
        "video_id": 14,
        "title": "Meditation Benefits",
        "description": "Discover the mental and physical benefits of practicing meditation."
    },
    {
        "video_id": 14,
        "title": "Meditation Techniques",
        "description": "Learn different meditation techniques to find the one that works best for you."
    },
    {
        "video_id": 15,
        "title": "AI Fundamentals",
        "description": "Get an overview of the fundamental concepts of artificial intelligence."
    },
    {
        "video_id": 15,
        "title": "AI Applications",
        "description": "Learn about the various applications of artificial intelligence in different industries."
    }
]


# Adds a demo user, you can add other notes here if you want
def seed_notes():
    for note in note_data:
        db.session.add(Note(**note))
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the notes table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
