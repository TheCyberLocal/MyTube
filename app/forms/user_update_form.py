from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import Email, ValidationError, Length, StopValidation
from flask_login import current_user
from app.models import User

class OptionalIfData:
    def __call__(self, form, field):
        if not field.data:
            field.errors[:] = []
            raise StopValidation()

def user_exists(form, field):
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


class UserUpdateForm(FlaskForm):
    username = StringField('username', validators=[OptionalIfData(), username_exists, Length(6, 20)])
    email = StringField('email', validators=[OptionalIfData(), user_exists, Email()])
    name = StringField('name', validators=[OptionalIfData(), Length(3, 20)])
    theme = StringField('theme', validators=[OptionalIfData(), Length(3, 12)])
    language = StringField('language', validators=[OptionalIfData(), Length(2, 2)])
