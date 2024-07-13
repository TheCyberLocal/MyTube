from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp, EqualTo, Optional
from sqlalchemy import or_
from app.models import User
from flask_login import current_user


def user_exists(form, field):
    credential = field.data
    user = User.query.filter(or_(User.email == credential, User.username == credential)).first()
    if not user:
        raise ValidationError('User provided not found')


def email_exists(form, field):
    email = field.data
    if email:
        user = User.query.filter(User.email == email).first()
        if user and user.id != current_user.id:
            raise ValidationError('Email address is already in use')


def username_exists(form, field):
    username = field.data
    if username:
        user = User.query.filter(User.username == username).first()
        if user and user.id != current_user.id:
            raise ValidationError('Username is already in use')


def password_matches(form, field):
    password = field.data
    credential = form.credential.data
    user = User.query.filter(or_(User.email == credential, User.username == credential)).first()
    if not user or not user.check_password(password):
        raise ValidationError('Invalid user or password')


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired(), password_matches])


class SignUpForm(FlaskForm):
    password_regex = r"(?=^.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])"

    username = StringField('username', validators=[DataRequired(), Length(4, 20), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(), email_exists])
    name = StringField('name', validators=[DataRequired(), Length(3, 20)])
    password = StringField('password', validators=[DataRequired(), Length(min=8), Regexp(password_regex, message="Password must contain an uppercase letter, lowercase letter, digit and a symbol")])
    confirm_password = StringField('password', validators=[EqualTo('password', message='Confirm password must match')])


class UserUpdateForm(FlaskForm):
    username = StringField('username', validators=[Optional(), Length(4, 20), username_exists])
    email = StringField('email', validators=[Optional(), Email(), email_exists])
    name = StringField('name', validators=[Optional(), Length(3, 20)])
    theme = StringField('theme', validators=[Optional(), Length(3, 12)])
    language = StringField('language', validators=[Optional(), Length(2, 2)])
