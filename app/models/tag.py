from .db import db, environment, SCHEMA, add_prefix_for_prod
from .video_tag import VideoTag
video_tag = VideoTag.__table__

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False, unique=True)

    videos = db.relationship('Video', secondary=video_tag, back_populates='tags')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }
