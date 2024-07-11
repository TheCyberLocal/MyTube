from flask import Blueprint, request, jsonify
from app.models import db, Highlight, Video
from app.forms import HighlightForm, UpdateHighlightForm
from flask_login import current_user


highlight_routes = Blueprint('highlights', __name__)


@highlight_routes.route('/videos/<int:video_id>/highlights', methods=['GET'])
def get_highlights(video_id):
    video = Video.query.filter(Video.id == video_id).first()
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view highlights on this video.'}), 403

    highlights = Highlight.query.filter_by(video_id=video_id).all()
    return jsonify([highlight.to_dict() for highlight in highlights]), 200


@highlight_routes.route('/highlights/<int:id>', methods=['GET'])
def get_highlight(id):
    highlight = Highlight.query.get_or_404(id)

    video = Video.query.filter(Video.id == highlight.video_id).first()
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view this highlight.'}), 403

    return jsonify(highlight.to_dict()), 200


@highlight_routes.route('/highlights', methods=['POST'])
def create_highlight():
    form = HighlightForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    video = Video.query.filter(Video.id == form.video_id.data).first()
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
def update_highlight(id):
    highlight = Highlight.query.get_or_404(id)

    video = Video.query.filter(Video.id == highlight.video_id).first()
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to update this highlight.'}), 403

    form = UpdateHighlightForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    # Validate start is not after end
    if form.start_time.data is None:
        start_time = highlight.start_time
    if form.end_time.data is None:
        end_time = highlight.end_time
    if start_time > end_time:
        return jsonify({'errors': 'Start time cannot be after end time.'}), 400

    if form.video_id.data is not None:
        highlight.video_id = form.video_id.data
    if form.title.data:
        highlight.title = form.title.data
    if form.start_time.data is not None:
        highlight.start_time = form.start_time.data
    if form.end_time.data is not None:
        highlight.end_time = form.end_time.data

    db.session.commit()
    return jsonify(highlight.to_dict()), 200


@highlight_routes.route('/highlights/<int:id>', methods=['DELETE'])
def delete_highlight(id):
    highlight = Highlight.query.get_or_404(id)

    video = Video.query.filter(Video.id == highlight.video_id).first()
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to delete this highlight.'}), 403

    db.session.delete(highlight)
    db.session.commit()
    return jsonify({"message": "Highlight deleted successfully"}), 200
