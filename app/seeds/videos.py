from app.models import db, Video, environment, SCHEMA
from sqlalchemy.sql import text


video_data = [
    {
        "user_id": 1,
        "title": "How to Make Perfect Pasta",
        "description": "Learn the secrets to making perfect pasta every time. From selecting the right ingredients to mastering the cooking process, this video covers everything you need to know.",
        "url": "3AAdKl1UYZs"
    },
    {
        "user_id": 1,
        "title": "The Science of Climate Change",
        "description": "An in-depth look at the science behind climate change, its impact on our planet, and what we can do to mitigate its effects.",
        "url": "EBd2vf7-KGs"
    },
    {
        "user_id": 1,
        "title": "The Evolution of Music",
        "description": "Explore the history of music from ancient times to modern-day genres. This video takes you on a journey through the evolution of musical styles and instruments.",
        "url": "MKu0zE-pv5g"
    },
    {
        "user_id": 1,
        "title": "Beginner's Guide to Yoga",
        "description": "A comprehensive guide to starting your yoga journey. Learn the basics of yoga poses, breathing techniques, and the benefits of incorporating yoga into your daily routine.",
        "url": "v7AYKMP6rOE"
    },
    {
        "user_id": 1,
        "title": "Understanding Quantum Physics",
        "description": "Dive into the fascinating world of quantum physics. This video explains the fundamental concepts of quantum mechanics and their implications for our understanding of the universe.",
        "url": "fK9hK82r-AM"
    },
    {
        "user_id": 1,
        "title": "The Art of Baking Bread",
        "description": "Master the art of baking bread at home. This tutorial covers everything from selecting the right flour to kneading techniques and baking tips for perfect bread every time.",
        "url": "HoYJdlVdSuM"
    },
    {
        "user_id": 1,
        "title": "Basics of Digital Photography",
        "description": "Learn the basics of digital photography, including camera settings, composition, and editing techniques to take stunning photos.",
        "url": "3WmALfIQ1e8"
    },
    {
        "user_id": 1,
        "title": "History of the Internet",
        "description": "A comprehensive overview of the history of the internet, from its early beginnings to the modern digital age.",
        "url": "pT4EbM7dCMs"
    },
    {
        "user_id": 1,
        "title": "The Human Digestive System",
        "description": "Explore the intricate workings of the human digestive system. This video covers the anatomy, function, and importance of each part of the digestive tract.",
        "url": "9Mgtb0LB2u0"
    },
    {
        "user_id": 1,
        "title": "Learning Guitar for Beginners",
        "description": "A step-by-step guide for beginners to learn how to play the guitar. This video covers basic chords, strumming patterns, and tips for practicing effectively.",
        "url": "fwkD2MegmAI"
    },
    {
        "user_id": 1,
        "title": "Exploring the Solar System",
        "description": "Join us on a journey through the solar system. Learn about the planets, moons, and other celestial bodies that make up our cosmic neighborhood.",
        "url": "l9_zZoC6TrQ"
    },
    {
        "user_id": 1,
        "title": "Cooking with Spices: A Beginner's Guide",
        "description": "Unlock the secrets of cooking with spices. This video teaches you how to use different spices to enhance the flavor of your dishes.",
        "url": "bflztiFlrWo"
    },
    {
        "user_id": 1,
        "title": "Introduction to Programming with Python",
        "description": "Learn the basics of programming using Python. This video covers fundamental concepts like variables, loops, and functions to get you started with coding.",
        "url": "rfscVS0vtbw"
    },
    {
        "user_id": 1,
        "title": "The Benefits of Meditation",
        "description": "Discover the benefits of meditation and how to practice it effectively. This video provides tips and techniques for incorporating meditation into your daily routine.",
        "url": "inpok4MKVLM"
    },
    {
        "user_id": 1,
        "title": "Understanding Artificial Intelligence",
        "description": "An introductory guide to artificial intelligence, its applications, and its potential impact on various industries.",
        "url": "2ePf9rue1Ao"
    }
]


# Function to seed videos
def seed_videos():
    for video in video_data:
        db.session.add(Video(**video))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the videos table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM videos"))

    db.session.commit()
