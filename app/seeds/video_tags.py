from app.models import db, VideoTag, environment, SCHEMA
from sqlalchemy.sql import text

video_tag_data = [
    {
        "video_id": 1,
        "tag_id": 293,
    },
    {
        "video_id": 1,
        "tag_id": 104,
    },
    {
        "video_id": 2,
        "tag_id": 348,
    },
    {
        "video_id": 2,
        "tag_id": 456,
    },
    {
        "video_id": 3,
        "tag_id": 277,
    },
    {
        "video_id": 3,
        "tag_id": 199,
    },
    {
        "video_id": 4,
        "tag_id": 436,
    },
    {
        "video_id": 4,
        "tag_id": 256,
    },
    {
        "video_id": 5,
        "tag_id": 348,
    },
    {
        "video_id": 5,
        "tag_id": 304,
    },
    {
        "video_id": 6,
        "tag_id": 30,
    },
    {
        "video_id": 6,
        "tag_id": 201,
    },
    {
        "video_id": 7,
        "tag_id": 124,
    },
    {
        "video_id": 7,
        "tag_id": 303,
    },
    {
        "video_id": 8,
        "tag_id": 139,
    },
    {
        "video_id": 8,
        "tag_id": 280,
    },
    {
        "video_id": 9,
        "tag_id": 50,
    },
    {
        "video_id": 9,
        "tag_id": 469,
    },
    {
        "video_id": 10,
        "tag_id": 238,
    },
    {
        "video_id": 10,
        "tag_id": 277,
    },
    {
        "video_id": 11,
        "tag_id": 366,
    },
    {
        "video_id": 11,
        "tag_id": 33,
    },
    {
        "video_id": 12,
        "tag_id": 104,
    },
    {
        "video_id": 12,
        "tag_id": 204,
    },
    {
        "video_id": 13,
        "tag_id": 315,
    },
    {
        "video_id": 13,
        "tag_id": 362,
    },
    {
        "video_id": 14,
        "tag_id": 256,
    },
    {
        "video_id": 14,
        "tag_id": 297,
    },
    {
        "video_id": 15,
        "tag_id": 10,
    },
    {
        "video_id": 15,
        "tag_id": 11,
    }
]

# Adds a demo video_tag, you can add other video_tags here if you want
def seed_video_tags():
    for video_tag in video_tag_data:
        db.session.add(VideoTag(**video_tag))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the video_tags table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_video_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.video_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM video_tags"))

    db.session.commit()
