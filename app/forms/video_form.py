from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, URLField
from wtforms.validators import DataRequired, Length, Optional


class VideoForm(FlaskForm):
    title = StringField('title', validators=[Length(1, 255)])
    description = TextAreaField('description', validators=[DataRequired()])
    url = URLField('url', validators=[DataRequired()])


class UpdateVideoForm(FlaskForm):
    title = StringField('title', validators=[Optional(), Length(1, 255)])
    description = TextAreaField('description')
    url = URLField('url')
