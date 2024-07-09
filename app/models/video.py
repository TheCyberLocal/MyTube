from .db import db, environment, SCHEMA, add_prefix_for_prod

class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    tags = db.Column(db.ARRAY(db.String(20)))
    last_viewed = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now(), onupdate=db.func.now())

    user = db.relationship('User', back_populates='videos')
    # notes = db.relationship('Note', back_populates='video')
    # highlights = db.relationship('Highlight', back_populates='video')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'tags': self.tags,
            'last_viewed': self.last_viewed,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }