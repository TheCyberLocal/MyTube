from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from flask_login import current_user
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and user.id != current_user.id:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.id != current_user.id:
        raise ValidationError('Username is already in use.')


class UserUpdateForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists, Length(6, 20)])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    name = StringField('name', validators=[DataRequired(), Length(3, 20)])
    theme = StringField('theme', validators=[DataRequired(), Length(3, 12)])
    language = StringField('language', validators=[DataRequired(), Length(2, 2)])
