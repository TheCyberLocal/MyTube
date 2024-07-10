from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, StopValidation, ValidationError


class OptionalIfData:
    def __call__(self, form, field):
        if not field.data:
            field.errors[:] = []
            raise StopValidation()


class HighlightForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[DataRequired(), NumberRange(min=1)])
    name = StringField('name', validators=[DataRequired(), Length(1, 255)])
    start_time = IntegerField('start_time', validators=[DataRequired(), NumberRange(min=0)])
    end_time = IntegerField('end_time', validators=[DataRequired(), NumberRange(min=0)])

    def validate_end_time(form, field):
        if form.start_time.data > form.end_time.data:
            raise ValidationError('End time must be after start time.')


class UpdateHighlightForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[OptionalIfData(), NumberRange(min=1)])
    name = StringField('name', validators=[OptionalIfData(), Length(1, 255)])
    start_time = IntegerField('start_time', validators=[OptionalIfData(), NumberRange(min=0)])
    end_time = IntegerField('end_time', validators=[OptionalIfData(), NumberRange(min=0)])
