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
        "title": "What is Climate Change? Explore the Causes of Climate Change",
        "description": "This video explores the consequences of climate change on our environment - such as rising sea levels, more frequent extreme weather, and damage to our ecosystems - it also suggests both big and little changes that we can make to protect our Earth.",
        "url": "EuwMB1Dal-4"
    },
    {
        "user_id": 1,
        "title": "1 A.M Study Session 📚 [lofi hip hop/chill beats]",
        "description": "A great study session with some of the best lofi hip hop and chill beats.",
        "url": "lTRiuFIWV54"
    },
    {
        "user_id": 1,
        "title": "Beginner's Guide to Yoga",
        "description": "A comprehensive guide to starting your yoga journey. Learn the basics of yoga poses, breathing techniques, and the benefits of incorporating yoga into your daily routine.",
        "url": "v7AYKMP6rOE"
    },
    {
        "user_id": 1,
        "title": "String Theory Explained - What is The True Nature of Reality?",
        "description": "s String Theory the final solution for all of physic's questions or an overhyped dead end? This video was realised with the help of Dr. Alessandro Sfondrini and it was funded by SNSF under Agora Grant n. 171622 and through the NCCR SwissMAP: The Mathematics of Physics.",
        "url": "Da-2h2B4faU"
    },
    {
        "user_id": 1,
        "title": "The Art of Baking Bread",
        "description": "Master the art of baking bread at home. This tutorial covers everything from selecting the right flour to kneading techniques and baking tips for perfect bread every time.",
        "url": "EGbNI26PPYg"
    },
    {
        "user_id": 1,
        "title": "Basics of Digital Photography",
        "description": "Learn the basics of digital photography, including camera settings, composition, and editing techniques to take stunning photos.",
        "url": "V7z7BAZdt2M"
    },
    {
        "user_id": 1,
        "title": "History of the Internet",
        "description": "A comprehensive overview of the history of the internet, from its early beginnings to the modern digital age.",
        "url": "VPToE8vwKew"
    },
    {
        "user_id": 1,
        "title": "The Human Digestive System",
        "description": "Explore the intricate workings of the human digestive system. This video covers the anatomy, function, and importance of each part of the digestive tract.",
        "url": "lm3oIX6jjn4"
    },
    {
        "user_id": 1,
        "title": "Learning Guitar for Beginners",
        "description": "A step-by-step guide for beginners to learn how to play the guitar. This video covers basic chords, strumming patterns, and tips for practicing effectively.",
        "url": "BBz-Jyr23M4"
    },
    {
        "user_id": 1,
        "title": "Exploring the Solar System",
        "description": "Join us on a journey through the solar system. Learn about the planets, moons, and other celestial bodies that make up our cosmic neighborhood.",
        "url": "Qd6nLM2QlWw"
    },
    {
        "user_id": 1,
        "title": "Cooking with Spices: A Beginner's Guide",
        "description": "Unlock the secrets of cooking with spices. This video teaches you how to use different spices to enhance the flavor of your dishes.",
        "url": "bsYzWK3cxOM"
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
