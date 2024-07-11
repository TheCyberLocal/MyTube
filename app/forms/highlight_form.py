from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError, Optional


def is_int(form, field):
    if field.data is None:
        raise ValidationError('Data is required.')

    try:
        field.data = int(field.data)
    except (ValueError, TypeError):
        raise ValidationError('Field must be an integer.')


def validate_end_time(form, field):
    start_time = form.start_time.data
    end_time = form.end_time.data

    start_time_valid = True
    end_time_valid = True

    # Check if start_time is an integer
    try:
        start_time = int(start_time)
    except (ValueError, TypeError):
        start_time_valid = False

    # Check if end_time is an integer
    try:
        end_time = int(end_time)
    except (ValueError, TypeError):
        end_time_valid = False

    # Only compare start_time and end_time if both are valid integers
    if start_time_valid and end_time_valid:
        if start_time > end_time:
            raise ValidationError('End time must be after start time.')


class HighlightForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[DataRequired(), NumberRange(min=1)])
    title = StringField('title', validators=[DataRequired(), Length(1, 255)])
    start_time = IntegerField('start_time', validators=[is_int, NumberRange(min=0)])
    end_time = IntegerField('end_time', validators=[is_int, NumberRange(min=0), validate_end_time])


class UpdateHighlightForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[Optional(), NumberRange(min=1)])
    title = StringField('title', validators=[Optional(), Length(1, 255)])
    start_time = IntegerField('start_time', validators=[is_int, NumberRange(min=0)])
    end_time = IntegerField('end_time', validators=[is_int, NumberRange(min=0), validate_end_time])
