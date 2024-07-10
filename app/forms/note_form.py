from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange


class NoteForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[DataRequired(), NumberRange(min=0)])
    title = StringField('title', validators=[DataRequired(), Length(1, 255)])
    description = TextAreaField('description', validators=[DataRequired()])
