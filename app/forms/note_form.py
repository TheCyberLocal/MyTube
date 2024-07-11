from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError
from app.models import Video, Note, db
from flask_login import current_user


def is_owner(form, field):
    video = Video.query.filter(Note.video_id == field.data).first()
    if video.user_id != current_user.id:
        raise ValidationError('You do not have permission to add a highlight to this video.')


class NoteForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[DataRequired(), NumberRange(min=1)])
    title = StringField('title', validators=[DataRequired(), Length(1, 255)])
    description = TextAreaField('description', validators=[DataRequired()])
