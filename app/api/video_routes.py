from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Video, Tag, VideoTag
from app.forms import VideoForm, UpdateVideoForm


video_routes = Blueprint('videos', __name__)


@video_routes.route('/my-videos', methods=['GET'])
@login_required
def get_my_videos():
    videos = Video.query.filter_by(user_id=current_user.id).all()
    return jsonify([video.to_dict() for video in videos]), 200


@video_routes.route('/videos/<int:id>', methods=['GET'])
@login_required
def get_video(id):
    video = Video.query.get_or_404(id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view this video.'}), 403

    return jsonify(video.to_dict()), 200


@video_routes.route('/videos', methods=['POST'])
@login_required
def create_video():
    form = VideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # Extract tags from request data
    tag_names = request.json.get('tags', [])

    # Validate new tags
    new_tags = []
    for tag_name in tag_names:
        tag = Tag.query.filter_by(name=tag_name).first()
        if not tag:
            return jsonify({'errors': f'Invalid tag: {tag_name}'}), 400
        new_tags.append(tag)

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    video = Video(
        user_id=current_user.id,
        title=form.title.data,
        description=form.description.data,
        url=form.url.data
    )
    db.session.add(video)
    db.session.commit()

    # Add new tags
    for tag in new_tags:
        video_tag = VideoTag(tag_id=tag.id, video_id=video.id)
        db.session.add(video_tag)

    db.session.commit()

    return jsonify(video.to_dict()), 201


@video_routes.route('/videos/<int:id>', methods=['PATCH'])
@login_required
def update_video(id):
    video = Video.query.get_or_404(id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to update this video.'}), 403

    form = UpdateVideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    # Extract tags from request data
    tag_names = request.json.get('tags', [])

    # Validate new tags
    new_tags = []
    for tag_name in tag_names:
        tag = Tag.query.filter_by(name=tag_name).first()
        if not tag:
            return jsonify({'errors': f'Invalid tag: {tag_name}'}), 400
        new_tags.append(tag)

    # Update video details
    if form.title.data:
        video.title = form.title.data
    if form.description.data:
        video.description = form.description.data
    if form.url.data:
        video.url = form.url.data

    # Remove old tags
    VideoTag.query.filter_by(video_id=video.id).delete()
    db.session.commit()

    # Add new tags
    for tag in new_tags:
        video_tag = VideoTag(tag_id=tag.id, video_id=video.id)
        db.session.add(video_tag)

    db.session.commit()

    return jsonify(video.to_dict()), 200


@video_routes.route('/videos/<int:id>', methods=['DELETE'])
@login_required
def delete_video(id):
    video = Video.query.get_or_404(id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to delete this video.'}), 403

    db.session.delete(video)
    db.session.commit()
    return jsonify({"message": "Video deleted successfully"}), 200
