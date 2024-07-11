from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Note, Video
from app.forms import NoteForm, UpdateNoteForm


note_routes = Blueprint('notes', __name__)


@note_routes.route('/videos/<int:video_id>/notes', methods=['GET'])
@login_required
def get_video_notes(video_id):
    video = Video.query.get_or_404(video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view notes on this video.'}), 403

    notes = Note.query.filter_by(video_id=video_id).all()
    return jsonify([note.to_dict() for note in notes]), 200


@note_routes.route('/notes/<int:id>', methods=['GET'])
@login_required
def get_note(id):
    note = Note.query.get_or_404(id)
    video = Video.query.get_or_404(note.video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view this note.'}), 403

    return jsonify(note.to_dict()), 200


@note_routes.route('/notes', methods=['POST'])
@login_required
def create_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    video = Video.query.get_or_404(form.video_id.data)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to add a note to this video.'}), 403

    note = Note(
        video_id=form.video_id.data,
        title=form.title.data,
        description=form.description.data
    )
    db.session.add(note)
    db.session.commit()
    return jsonify(note.to_dict()), 201


@note_routes.route('/notes/<int:id>', methods=['PATCH'])
@login_required
def update_note(id):
    note = Note.query.get_or_404(id)
    video = Video.query.get_or_404(note.video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to update this note.'}), 403

    form = UpdateNoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not form.validate_on_submit():
        return jsonify(form.errors), 400

    if form.video_id.data is not None:
        new_video = Video.query.get_or_404(form.video_id.data)
        if new_video.user_id != current_user.id:
            return jsonify({'errors': 'You do not have permission to move notes to this video.'}), 403
        note.video_id = form.video_id.data
    if form.title.data:
        note.title = form.title.data
    if form.description.data:
        note.description = form.description.data

    db.session.commit()
    return jsonify(note.to_dict()), 200


@note_routes.route('/notes/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    note = Note.query.get_or_404(id)
    video = Video.query.get_or_404(note.video_id)
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to delete this note.'}), 403

    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Note deleted successfully"}), 200
