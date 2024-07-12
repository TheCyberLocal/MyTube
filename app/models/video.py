from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .video_tag import VideoTag
video_tag = VideoTag.__table__

class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    url = db.Column(db.Text, nullable=False, unique=True)
    last_viewed = db.Column(db.DateTime, nullable=False, server_default=func.now(), onupdate=func.now())
    created_at = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=func.now(), onupdate=func.now())

    user = db.relationship('User', back_populates='videos')
    notes = db.relationship('Note', back_populates='video')
    highlights = db.relationship('Highlight', back_populates='video')
    tags = db.relationship('Tag', secondary=video_tag, back_populates='videos')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'url': self.url,
            'tags': [tag.to_dict() for tag in self.tags],
            'last_viewed': self.last_viewed,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
