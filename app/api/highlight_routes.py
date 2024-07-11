from flask import Blueprint, request, jsonify
from app.models import db, Highlight, Video
from app.forms import HighlightForm, UpdateHighlightForm
from flask_login import current_user, login_required


highlight_routes = Blueprint('highlights', __name__)


@highlight_routes.route('/videos/<int:video_id>/highlights', methods=['GET'])
@login_required
def get_highlights(video_id):
    video = Video.query.get_or_404(video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view highlights on this video.'}), 403

    highlights = Highlight.query.filter_by(video_id=video_id).all()
    return jsonify([highlight.to_dict() for highlight in highlights]), 200


@highlight_routes.route('/highlights/<int:id>', methods=['GET'])
@login_required
def get_highlight(id):
    highlight = Highlight.query.get_or_404(id)
    video = Video.query.get_or_404(highlight.video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view this highlight.'}), 403

    return jsonify(highlight.to_dict()), 200


@highlight_routes.route('/highlights', methods=['POST'])
@login_required
def create_highlight():
    form = HighlightForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    video = Video.query.get_or_404(form.video_id.data)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to add a highlight to this video.'}), 403

    highlight = Highlight(
        video_id=form.video_id.data,
        title=form.title.data,
        start_time=form.start_time.data,
        end_time=form.end_time.data
    )
    db.session.add(highlight)
    db.session.commit()
    return jsonify(highlight.to_dict()), 201


@highlight_routes.route('/highlights/<int:id>', methods=['PATCH'])
@login_required
def update_highlight(id):
    highlight = Highlight.query.get_or_404(id)
    video = Video.query.get_or_404(highlight.video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to update this highlight.'}), 403

    form = UpdateHighlightForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    # Validate start_time is not after end_time
    start_time = form.start_time.data if form.start_time.data is not None else highlight.start_time
    end_time = form.end_time.data if form.end_time.data is not None else highlight.end_time
    if start_time > end_time:
        return jsonify({'errors': 'Start time cannot be after end time.'}), 400

    if form.video_id.data is not None:
        new_video = Video.query.get_or_404(form.video_id.data)
        if new_video.user_id != current_user.id:
            return jsonify({'errors': 'You do not have permission to move highlights to this video.'}), 403
        highlight.video_id = form.video_id.data
    if form.title.data:
        highlight.title = form.title.data
    highlight.start_time = start_time
    highlight.end_time = end_time

    db.session.commit()
    return jsonify(highlight.to_dict()), 200


@highlight_routes.route('/highlights/<int:id>', methods=['DELETE'])
@login_required
def delete_highlight(id):
    highlight = Highlight.query.get_or_404(id)
    video = Video.query.get_or_404(highlight.video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to delete this highlight.'}), 403

    db.session.delete(highlight)
    db.session.commit()
    return jsonify({"message": "Highlight deleted successfully"}), 200
