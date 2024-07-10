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
        video = Video.query.get_or_404(form.video_id.data)
        if video.user_id != current_user.id:
            return jsonify({'errors': 'You do not have permission to add highlights to this video.'}), 403

        highlight = Highlight(
            video_id=form.video_id.data,
            name=form.name.data,
            start_time=form.start_time.data,
            end_time=form.end_time.data
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
        if form.video_id.data:
            new_video = Video.query.get_or_404(form.video_id.data)
            if new_video.user_id != current_user.id:
                return jsonify({'errors': 'You do not have permission to move highlights to this video.'}), 403
            highlight.video_id = form.video_id.data
        if form.name.data:
            highlight.name = form.name.data
        if form.start_time.data:
            highlight.start_time = form.start_time.data
        if form.end_time.data:
            highlight.end_time = form.end_time.data
        db.session.commit()
        return jsonify(highlight.to_dict())
    return jsonify({'errors': form.errors}), 400
