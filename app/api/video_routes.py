from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Video, Tag, VideoTag
from app.forms import VideoForm, UpdateVideoForm
from sqlalchemy.sql import func
from sqlalchemy import or_


video_routes = Blueprint('videos', __name__)


def processURL(raw_url):
    # process url types
    # type1 https://www.youtube.com/watch?v=jfKfPfyJRdk
    # type2 https://youtu.be/jfKfPfyJRdk
    format1 = raw_url.split('=')[-1]
    # format1 with type 1: jfKfPfyJRdk
    # format1 with type 2: https://youtu.be/jfKfPfyJRdk
    format2 = raw_url.split('/')[-1]
    # format2 with type 1: watch?v=jfKfPfyJRdk
    # format2 with type 2: jfKfPfyJRdk
    if len(format1) < len(format2):
        return format1
    else:
        return format2


@video_routes.route('/my-videos', methods=['GET'])
@login_required
def get_my_videos():
    # Get query parameters
    tags = request.args.get('tags', '').split(',')
    keyword_string = request.args.get('keyword', '')
    sort_by = request.args.get('sortBy', 'recently_viewed')
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
    print('here is the sort_by', sort_by)
    if sort_by == 'recently_viewed':
        query = query.order_by(Video.last_viewed.desc())
    elif sort_by == 'alphabetical':
        print("title is here=====>", Video.title)
        query = query.order_by(Video.title.asc())
    elif sort_by == 'newest':
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

    # Update the last_viewed property
    video.last_viewed = func.now()
    db.session.commit()

    return jsonify(video.to_dict()), 200


@video_routes.route('/videos', methods=['POST'])
@login_required
def create_video():
    form = VideoForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    video = Video.query.filter(Video.url == processURL(form.url.data))
    if video:
        return jsonify({'url': 'You already saved this video' }), 400

    # Extract tags from request data
    tag_names = request.json.get('tags', [])

    # Validate and create tag list by names
    new_tags = []
    for tag_name in tag_names:
        tag = Tag.query.filter_by(name=tag_name).first()
        if not tag:
            return jsonify({'errors': f'Invalid tag: {tag_name}'}), 400
        new_tags.append(tag)

    video = Video(
        user_id=current_user.id,
        title=form.title.data,
        description=form.description.data,
        url=processURL(form.url.data)
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
    tag_names = request.json.get('tags')

    new_tags = []
    if tag_names is not None:
        # Validate and create tag list by names
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
        video.url = processURL(form.url.data)
    db.session.commit()

    if tag_names is not None:
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
