from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text

note_data = [
    {
        "video_id": 1,
        "title": "Debugging Techniques",
        "description": "Understanding the different debugging techniques such as logging, using a debugger, and code review can significantly improve your debugging skills."
    },
    {
        "video_id": 1,
        "title": "Common Debugging Tools",
        "description": "Familiarize yourself with common debugging tools like GDB, LLDB, and browser dev tools to enhance your debugging process."
    },
    {
        "video_id": 2,
        "title": "Effective Study Sessions",
        "description": "Setting up a productive study environment with minimal distractions can greatly improve your learning efficiency."
    },
    {
        "video_id": 2,
        "title": "Lo-fi Hip Hop",
        "description": "Lo-fi hip hop music can help to create a calm and focused study atmosphere."
    },
    {
        "video_id": 3,
        "title": "HTML Basics",
        "description": "HTML is the foundation of web development, providing the structure of a webpage."
    },
    {
        "video_id": 3,
        "title": "Semantic HTML",
        "description": "Using semantic HTML tags improves the accessibility and SEO of your website."
    },
    {
        "video_id": 4,
        "title": "CSS Selectors",
        "description": "Understanding CSS selectors is crucial for styling elements on your webpage."
    },
    {
        "video_id": 4,
        "title": "Responsive Design",
        "description": "Learn to make your website responsive to ensure it looks good on all devices."
    },
    {
        "video_id": 5,
        "title": "JavaScript Syntax",
        "description": "Familiarize yourself with basic JavaScript syntax to start building interactive webpages."
    },
    {
        "video_id": 5,
        "title": "DOM Manipulation",
        "description": "Learn how to manipulate the DOM using JavaScript to create dynamic user interfaces."
    },
    {
        "video_id": 6,
        "title": "Python Basics",
        "description": "Python is a versatile language that is great for beginners and experts alike."
    },
    {
        "video_id": 6,
        "title": "Common Python Libraries",
        "description": "Learn about popular Python libraries such as NumPy, Pandas, and Matplotlib."
    },
    {
        "video_id": 7,
        "title": "React Components",
        "description": "Understand the concept of components in React and how to build reusable UI elements."
    },
    {
        "video_id": 7,
        "title": "State Management",
        "description": "Learn how to manage state in React applications using hooks and context."
    },
    {
        "video_id": 8,
        "title": "Node.js Basics",
        "description": "Node.js allows you to run JavaScript on the server-side, enabling full-stack development."
    },
    {
        "video_id": 8,
        "title": "Express Framework",
        "description": "Express is a minimal and flexible Node.js web application framework providing a robust set of features."
    },
    {
        "video_id": 9,
        "title": "RESTful APIs",
        "description": "Learn the principles of RESTful API design and how to create RESTful endpoints with Node.js and Express."
    },
    {
        "video_id": 9,
        "title": "CRUD Operations",
        "description": "Understand how to perform CRUD operations (Create, Read, Update, Delete) with a RESTful API."
    },
    {
        "video_id": 10,
        "title": "Django Overview",
        "description": "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design."
    },
    {
        "video_id": 10,
        "title": "Django Models",
        "description": "Learn how to define models in Django and interact with the database."
    },
    {
        "video_id": 11,
        "title": "Docker Basics",
        "description": "Docker is a platform for developing, shipping, and running applications in containers."
    },
    {
        "video_id": 11,
        "title": "Docker Compose",
        "description": "Docker Compose allows you to define and manage multi-container Docker applications."
    },
    {
        "video_id": 12,
        "title": "Git Basics",
        "description": "Git is a distributed version control system that helps you track changes in your codebase."
    },
    {
        "video_id": 12,
        "title": "GitHub Workflow",
        "description": "Learn the common GitHub workflow, including forking repositories, creating branches, and making pull requests."
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
