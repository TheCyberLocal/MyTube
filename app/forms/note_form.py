from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange, Optional, ValidationError


def is_int(form, field):
    if field.data is None:
        raise ValidationError('Data is required')

    try:
        field.data = int(field.data)
    except (ValueError, TypeError):
        raise ValidationError('Field must be an integer')


class NoteForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[DataRequired(), is_int, NumberRange(min=1)])
    title = StringField('title', validators=[DataRequired(), Length(1, 255)])
    description = TextAreaField('description', validators=[DataRequired()])


class UpdateNoteForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[Optional(), is_int, NumberRange(min=1)])
    title = StringField('title', validators=[Optional(), Length(1, 255)])
    description = TextAreaField('description', validators=[Optional()])
