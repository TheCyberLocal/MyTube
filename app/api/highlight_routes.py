from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Highlight, Video, db
from app.forms import HighlightForm, UpdateHighlightForm


highlight_routes = Blueprint('highlights', __name__)


@highlight_routes.route('/', methods=['POST'])
@login_required
def create_highlight():
    form = HighlightForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        video = Video.query.get_or_404(form.data.video_id)
        if video.user_id != current_user.id:
            return jsonify({'errors': 'You do not have permission to add highlights to this video.'}), 403

        highlight = Highlight(
            video_id=form.data.video_id,
            name=form.data.name,
            start_time=form.data.start_time,
            end_time=form.data.end_time
        )
        db.session.add(highlight)
        db.session.commit()
        return jsonify(highlight.to_dict()), 201
    return jsonify({'errors': form.errors}), 400


@highlight_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_highlight(id):
    highlight = Highlight.query.get_or_404(id)
    video = Video.query.get_or_404(highlight.video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to update highlights for this video.'}), 403

    form = UpdateHighlightForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data.video_id:
            new_video = Video.query.get_or_404(form.data.video_id)
            if new_video.user_id != current_user.id:
                return jsonify({'errors': 'You do not have permission to move highlights to this video.'}), 403
            highlight.video_id = form.data.video_id
        if form.data.name:
            highlight.name = form.data.name
        if form.data.start_time:
            highlight.start_time = form.data.start_time
        if form.data.end_time:
            highlight.end_time = form.data.end_time
        db.session.commit()
        return jsonify(highlight.to_dict())
    return jsonify({'errors': form.errors}), 400
