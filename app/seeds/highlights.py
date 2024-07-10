from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

highlight_data = [
    {
        "video_id": 1,
        "title": "My Favorite of the Most Important Skills",
        "start_time": 60,
        "end_time": 90,
    },
    ## Add 2 more highlights for each video. Try to make them relevant,
    #  even if the time frames are made up just make them some time during the video length.
]

# Adds a demo user, you can add other highlights here if you want
def seed_highlights():
    for user in highlight_data:
        db.session.add(User(**user))

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
