from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, URLField, IntegerField
from wtforms.validators import DataRequired, Length, URL, NumberRange


class VideoForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(), NumberRange(min=1)])
    title = StringField('title', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('description', validators=[DataRequired()])
    url = URLField('url', validators=[DataRequired(), URL()])
    tags = StringField('tags')  # This will be a comma-separated string of tag names
