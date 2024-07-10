from app.models import db, Video, Tag, environment, SCHEMA
from sqlalchemy.sql import text

video_data = [
    {
        "user_id": 1,
        "title": "The Most Important Skill You Never Learned",
        "description": "Learning how to find, and solve bugs in your code is one of the most important skills you can learn as a developer. This is because most of your time spent as a developer will be spent debugging so you need to learn to become a master debugger in order to excel at programming. In this crash course I will teach you everything you need to know to master debugging.",
        "url": "https://youtu.be/l8pe_MSX4Lc"
    },
    {
        "user_id": 1,
        "title": "1 A.M Study Session 📚 [lofi hip hop/chill beats]",
        "description": "One of my favorite of the lofi hip hop collection.",
        "url": "https://youtu.be/lTRiuFIWV54"
    },
    {
        "user_id": 1,
        "title": "HTML Full Course - Build a Website Tutorial",
        "description": "Learn the basics of HTML5 and web development in this awesome course for beginners.",
        "url": "https://youtu.be/pQN-pnXPaVg"
    },
    {
        "user_id": 1,
        "title": "CSS Crash Course For Absolute Beginners",
        "description": "Learn the basics of CSS in this complete crash course.",
        "url": "https://youtu.be/yfoY53QXEnI"
    },
    {
        "user_id": 1,
        "title": "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
        "description": "This is a complete JavaScript tutorial for beginners to learn JavaScript from scratch.",
        "url": "https://youtu.be/W6NZfCO5SIk"
    },
    {
        "user_id": 1,
        "title": "Python for Beginners - Learn Python in 1 Hour",
        "description": "Learn Python programming language in just one hour.",
        "url": "https://youtu.be/rfscVS0vtbw"
    },
    {
        "user_id": 1,
        "title": "React JS Crash Course",
        "description": "This crash course will cover all the basics of React.js, a popular JavaScript library for building user interfaces.",
        "url": "https://youtu.be/Dorf8i6lCuk"
    },
    {
        "user_id": 1,
        "title": "Node.js Crash Course",
        "description": "Learn Node.js, a powerful JavaScript runtime, in this crash course.",
        "url": "https://youtu.be/fBNz5xF-Kx4"
    },
    {
        "user_id": 1,
        "title": "REST API Tutorial",
        "description": "Learn how to create a REST API with Node.js and Express in this comprehensive tutorial.",
        "url": "https://youtu.be/1zkgdLZEdwM"
    },
    {
        "user_id": 1,
        "title": "Learn Django - Full Tutorial for Beginners",
        "description": "This is a complete tutorial for beginners to learn the Django web framework.",
        "url": "https://youtu.be/F5mRW0jo-U4"
    },
    {
        "user_id": 1,
        "title": "Docker Tutorial for Beginners",
        "description": "Learn Docker from scratch in this beginner-friendly tutorial.",
        "url": "https://youtu.be/3c-iBn73dDE"
    },
    {
        "user_id": 1,
        "title": "Git and GitHub Crash Course",
        "description": "Learn the basics of Git and GitHub in this crash course.",
        "url": "https://youtu.be/SWYqp7iY_Tc"
    },
    {
        "user_id": 1,
        "title": "Machine Learning Tutorial Python - 7.2 Neural Networks with Keras",
        "description": "Learn how to create neural networks using Keras in this in-depth tutorial.",
        "url": "https://youtu.be/WFr2WgN9_xE"
    },
    {
        "user_id": 1,
        "title": "Data Structures Easy to Advanced Course - Full Tutorial from a Google Engineer",
        "description": "Learn about data structures in this comprehensive tutorial by a Google engineer.",
        "url": "https://youtu.be/RBSGKlAvoiM"
    },
    {
        "user_id": 1,
        "title": "Algorithms and Data Structures Tutorial - Full Course for Beginners",
        "description": "This course covers all the basic algorithms and data structures in computer science.",
        "url": "https://youtu.be/8hly31xKli0"
    },
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
