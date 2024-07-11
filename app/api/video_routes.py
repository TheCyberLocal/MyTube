from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Video, Tag, VideoTag
from app.forms import VideoForm, UpdateVideoForm
from sqlalchemy import or_


video_routes = Blueprint('videos', __name__)


@video_routes.route('/my-videos', methods=['GET'])
@login_required
def get_my_videos():
    # Get query parameters
    tags = request.args.get('tags', '').split(',')
    keyword_string = request.args.get('keyword', '')
    sort_by = request.args.get('sort_by', 'newest')
    page = int(request.args.get('page', 1))
    per_page = 10

    # Base query
    query = Video.query.filter(Video.user_id == current_user.id)

    # Filter by tags
    if tags != ['']:
        query = query.join(VideoTag).join(Tag)\
        .filter(Tag.name.in_(tags))\
        .group_by(Video.id)\
        .having(db.func.count(Tag.id) == len(tags))

    # Filter by search string in title or description
    if keyword_string:
        query = query.filter(or_(Video.title.ilike(f"%{keyword_string}%"), Video.description.ilike(f"%{keyword_string}%")))

    # Order results
    if sort_by == 'recently_viewed':
        query = query.order_by(Video.last_viewed_at.desc())
    elif sort_by == 'alphabetical':
        query = query.order_by(Video.title.asc())
    else:  # Default to 'newest'
        query = query.order_by(Video.created_at.desc())

    # Paginate results
    videos = query.paginate(page=page, per_page=per_page, error_out=False).items

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
    tag_names = request.args.get('tags', '').split(',')

    # Initialize list and don't run empty tags
    new_tags = []
    if tag_names != ['']:
        # Validate and create tag list by names
        for tag_name in tag_names:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                return jsonify({'errors': f'Invalid tag: {tag_name}'}), 400
            new_tags.append(tag)

        # Add new tags
        for tag in new_tags:
            video_tag = VideoTag(tag_id=tag.id, video_id=video.id)
            db.session.add(video_tag)
        db.session.commit()

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
    tag_names = request.args.get('tags', '').split(',')

    # Initialize list and don't run empty tags
    new_tags = []
    if tag_names != ['']:
        # Validate and create tag list by names
        for tag_name in tag_names:
            tag = Tag.query.filter_by(name=tag_name).first()
            if not tag:
                return jsonify({'errors': f'Invalid tag: {tag_name}'}), 400
            new_tags.append(tag)

        # Remove old tags
        VideoTag.query.filter_by(video_id=video.id).delete()
        db.session.commit()

        # Add new tags
        for tag in new_tags:
            video_tag = VideoTag(tag_id=tag.id, video_id=video.id)
            db.session.add(video_tag)
        db.session.commit()

    # Update video details
    if form.title.data:
        video.title = form.title.data
    if form.description.data:
        video.description = form.description.data
    if form.url.data:
        video.url = form.url.data

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
