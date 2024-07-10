from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, URLField
from wtforms.validators import DataRequired, Length, URL


class VideoForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('description', validators=[DataRequired()])
    url = URLField('url', validators=[DataRequired(), URL()])
    tags = StringField('tags')  # This will be a comma-separated string of tag names
