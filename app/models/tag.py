from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    videos = db.relationship('Video', secondary='video_tags', back_populates='tags')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
