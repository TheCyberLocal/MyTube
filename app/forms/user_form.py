from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Regexp, StopValidation
from app.models import User
from flask_login import current_user
from sqlalchemy import or_


class OptionalIfData:
    def __call__(self, form, field):
        if not field.data:
            field.errors[:] = []
            raise StopValidation()


def user_exists(form, field):
    # Checking if user exists
    credential = field.data
    user = User.query.filter(or_(User.email == credential, User.username == credential)).first()
    if not user:
        raise ValidationError('User provided not found.')


def email_exists(form, field):
    email = field.data
    if email:
        user = User.query.filter(User.email == email).first()
        if user and user.id != current_user.id:
            raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    username = field.data
    if username:
        user = User.query.filter(User.username == username).first()
        if user and user.id != current_user.id:
            raise ValidationError('Username is already in use.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credential = form.data['credential']
    user = User.query.filter(or_(User.email == credential, User.username == credential)).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])


class SignUpForm(FlaskForm):
    password_regex = r"(?=^.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])"

    username = StringField('username', validators=[DataRequired(), username_exists, Length(6, 20)])
    email = StringField('email', validators=[DataRequired(), email_exists, Email()])
    name = StringField('name', validators=[DataRequired(), Length(3, 20)])
    password = StringField('password', validators=[DataRequired(), Length(min=8), Regexp(password_regex, message="Password must contain an uppercase letter, lowercase letter, digit and a symbol")])


class UserUpdateForm(FlaskForm):
    username = StringField('username', validators=[OptionalIfData(), username_exists, Length(6, 20)])
    email = StringField('email', validators=[OptionalIfData(), email_exists, Email()])
    name = StringField('name', validators=[OptionalIfData(), Length(3, 20)])
    theme = StringField('theme', validators=[OptionalIfData(), Length(3, 12)])
    language = StringField('language', validators=[OptionalIfData(), Length(2, 2)])
