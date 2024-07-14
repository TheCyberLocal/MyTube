from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Regexp, EqualTo

class UpdatePasswordForm(FlaskForm):
    password_regex = r"(?=^.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])"

    old_password = StringField('old_password', validators=[DataRequired()])
    new_password = StringField('new_password', validators=[DataRequired(), Length(min=8), Regexp(password_regex, message="Password must contain an uppercase letter, lowercase letter, digit and a symbol")])
    confirm_password = StringField('confirm_password', validators=[DataRequired(), EqualTo('new_password', message='Confirm password must match')])
