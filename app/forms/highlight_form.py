from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError, Optional


def is_int(form, field):
    if field.data is None:
        raise ValidationError('Data is required')

    try:
        field.data = int(field.data)
    except (ValueError, TypeError):
        raise ValidationError('Field must be an integer')


class HighlightForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[DataRequired(), NumberRange(min=1)])
    title = StringField('title', validators=[DataRequired(), Length(1, 255)])
    start_time = IntegerField('start_time', validators=[is_int, NumberRange(min=0)])
    end_time = IntegerField('end_time', validators=[is_int, NumberRange(min=0)])


class UpdateHighlightForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[Optional(), NumberRange(min=1)])
    title = StringField('title', validators=[Optional(), Length(1, 255)])
    start_time = IntegerField('start_time', validators=[Optional(), is_int, NumberRange(min=0)])
    end_time = IntegerField('end_time', validators=[Optional(), is_int, NumberRange(min=0)])
