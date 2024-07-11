from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Optional


class TagForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), Length(1, 50)])


class UpdateTagForm(FlaskForm):
    name = StringField('name', validators=[Optional(), Length(1, 50)])
