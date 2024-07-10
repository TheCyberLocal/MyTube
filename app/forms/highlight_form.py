from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange


class HighlightForm(FlaskForm):
    video_id = IntegerField('video_id', validators=[DataRequired(), NumberRange(min=1)])
    name = StringField('name', validators=[DataRequired(), Length(1, 255)])
    start_time = IntegerField('start_time', validators=[DataRequired(), NumberRange(min=0)])
    end_time = IntegerField('end_time', validators=[DataRequired(), NumberRange(min=0)])
