from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class NoteForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(1, 255)])
    description = TextAreaField('description', validators=[DataRequired()])
