from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, URLField, IntegerField, FieldList, FormField
from wtforms.validators import DataRequired, Length, URL, NumberRange, Optional
from .tag_form import TagForm


class VideoForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('description', validators=[DataRequired()])
    url = URLField('url', validators=[DataRequired(), URL()])


class UpdateVideoForm(FlaskForm):
    title = StringField('title', validators=[Optional(), Length(max=255)])
    description = TextAreaField('description', validators=[Optional()])
    url = URLField('url', validators=[Optional(), URL()])
