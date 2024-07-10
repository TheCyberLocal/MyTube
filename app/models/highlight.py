from .db import db, environment, SCHEMA, add_prefix_for_prod

class Highlight(db.Model):
    __tablename__ = 'highlights'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('videos.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    video = db.relationship('Video', back_populates='highlights')

    def to_dict(self):
        return {
            'id': self.id,
            'video_id': self.video_id,
            'title': self.title,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
