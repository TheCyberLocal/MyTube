from app.models import db, Video, Tag, environment, SCHEMA
from sqlalchemy.sql import text

# List of sample video data
video_data = [
    {
        "user_id": 1,
        "title": "Python Tutorial for Beginners",
        "description": "A comprehensive guide to learning Python for beginners.",
        "url": "https://www.youtube.com/watch?v=rfscVS0vtbw",
        "tags": ["Python", "Programming", "Tutorial"]
    },
    {
        "user_id": 1,
        "title": "Advanced JavaScript Techniques",
        "description": "Exploring advanced concepts and techniques in JavaScript.",
        "url": "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        "tags": ["JavaScript", "Web Development", "Advanced"]
    },
    {
        "user_id": 2,
        "title": "Data Science with Python",
        "description": "Learn data science concepts and techniques using Python.",
        "url": "https://www.youtube.com/watch?v=ua-CiDNNj30",
        "tags": ["Data Science", "Python", "Machine Learning"]
    },
    {
        "user_id": 2,
        "title": "Introduction to Web Development",
        "description": "Get started with web development using HTML, CSS, and JavaScript.",
        "url": "https://www.youtube.com/watch?v=pQN-pnXPaVg",
        "tags": ["Web Development", "HTML", "CSS", "JavaScript"]
    },
    {
        "user_id": 3,
        "title": "Building REST APIs with Flask",
        "description": "Create RESTful APIs using Flask, a micro web framework in Python.",
        "url": "https://www.youtube.com/watch?v=Z1RJmh_OqeA",
        "tags": ["Flask", "Python", "API"]
    },
    {
        "user_id": 3,
        "title": "Mastering React",
        "description": "Become proficient in building dynamic web applications using React.",
        "url": "https://www.youtube.com/watch?v=w7ejDZ8SWv8",
        "tags": ["React", "JavaScript", "Web Development"]
    },
    {
        "user_id": 4,
        "title": "Introduction to Machine Learning",
        "description": "Understand the basics of machine learning and its applications.",
        "url": "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
        "tags": ["Machine Learning", "Data Science", "Python"]
    },
    {
        "user_id": 4,
        "title": "Building Microservices with Spring Boot",
        "description": "Learn how to create microservices using Spring Boot.",
        "url": "https://www.youtube.com/watch?v=K54XI0sinCs",
        "tags": ["Spring Boot", "Java", "Microservices"]
    },
    {
        "user_id": 5,
        "title": "Understanding Kubernetes",
        "description": "Get an in-depth understanding of Kubernetes and container orchestration.",
        "url": "https://www.youtube.com/watch?v=X48VuDVv0do",
        "tags": ["Kubernetes", "DevOps", "Containers"]
    },
    {
        "user_id": 5,
        "title": "Deep Learning with TensorFlow",
        "description": "Master deep learning concepts using TensorFlow.",
        "url": "https://www.youtube.com/watch?v=tPYj3fFJGjk",
        "tags": ["Deep Learning", "TensorFlow", "Machine Learning"]
    },
    # Add more video entries here (total 50 entries)
]

# Function to seed videos
def seed_videos():
    for video in video_data:
        vid = Video(
            user_id=video["user_id"],
            title=video["title"],
            description=video["description"],
            url=video["url"],
            last_viewed=video["last_viewed"]
        )
        db.session.add(vid)
        db.session.commit()

        for tag_name in video["tags"]:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                tag = Tag(name=tag_name)
                db.session.add(tag)
                db.session.commit()
            vid.tags.append(tag)

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
