from .db import db, environment, SCHEMA, add_prefix_for_prod

class VideoTag(db.Model):
    __tablename__ = 'video_tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True)
