from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Tag, Video, VideoTag
from app.forms import TagForm, UpdateTagForm


tag_routes = Blueprint('tags', __name__)


@tag_routes.route('/videos/<int:video_id>/tags', methods=['GET'])
@login_required
def get_video_tags(video_id):
    video = Video.query.get_or_404(video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view tags for this video.'}), 403

    tags = db.session.query(Tag).join(VideoTag).filter(VideoTag.video_id == video_id).all()
    return jsonify([tag.to_dict() for tag in tags]), 200


@tag_routes.route('/tags/<int:id>', methods=['GET'])
@login_required
def get_tag(id):
    tag = Tag.query.get_or_404(id)
    return jsonify(tag.to_dict()), 200


@tag_routes.route('/tags', methods=['GET'])
@login_required
def get_tags():
    tags = Tag.query.all()
    return jsonify([tag.to_dict() for tag in tags]), 200


# @tag_routes.route('/tags', methods=['POST'])
# @login_required
# def create_tag():
#     form = TagForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if not form.validate_on_submit():
#         return jsonify(form.errors), 400

#     tag = Tag(name=form.name.data)
#     db.session.add(tag)
#     db.session.commit()
#     return jsonify(tag.to_dict()), 201


# @tag_routes.route('/tags/<int:id>', methods=['PATCH'])
# @login_required
# def update_tag(id):
#     tag = Tag.query.get_or_404(id)
#     form = UpdateTagForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if not form.validate_on_submit():
#         return jsonify(form.errors), 400

#     if form.name.data:
#         tag.name = form.name.data

#     db.session.commit()
#     return jsonify(tag.to_dict()), 200


# @tag_routes.route('/tags/<int:id>', methods=['DELETE'])
# @login_required
# def delete_tag(id):
#     tag = Tag.query.get_or_404(id)
#     db.session.delete(tag)
#     db.session.commit()
#     return jsonify({"message": "Tag deleted successfully"}), 200
