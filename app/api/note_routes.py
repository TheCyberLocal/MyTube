from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Note, Video, db


note_routes = Blueprint('notes', __name__)


@note_routes.route('/videos/<int:video_id>/notes')
@login_required
def get_video_notes(video_id):
    """
    Fetch notes associated with a video.
    """
    video = Video.query.get_or_404(video_id)

    # Check if the current user owns the video
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view notes on this video.'}), 403

    notes = Note.query.filter_by(video_id=video_id).all()
    return jsonify([note.to_dict() for note in notes])


@note_routes.route('/<int:id>')
@login_required
def get_note(id):
    """
    Fetch a single note by ID.
    """
    note = Note.query.get_or_404(id)
    video = Video.query.get_or_404(note.video_id)

    # Check if the current user owns the video
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to view this note.'}), 403

    return jsonify(note.to_dict())


@note_routes.route('/', methods=['POST'])
@login_required
def create_note():
    """
    Create a new note.
    """
    data = request.get_json()
    video = Video.query.get_or_404(data['video_id'])

    # Check if the current user owns the video
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to add notes to this video.'}), 403

    cleanNote = Note(
        video_id=data['video_id'],
        title=data['title'],
        description=data['description']
    )
    db.session.add(cleanNote)
    db.session.commit()
    return jsonify(cleanNote.to_dict()), 201


@note_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_note(id):
    """
    Update a note by ID.
    """
    note = Note.query.get_or_404(id)
    video = Video.query.get_or_404(note.video_id)

    # Check if the current user owns the video
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to update notes for this video.'}), 403

    data = request.get_json()
    note.title = data.get('title', note.title)
    note.description = data.get('description', note.description)
    db.session.commit()
    return jsonify(note.to_dict())


@note_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_note(id):
    """
    Delete a note by ID.
    """
    note = Note.query.get_or_404(id)
    video = Video.query.get_or_404(note.video_id)

    # Check if the current user owns the video
    if video.user_id != current_user.id:
        return jsonify({'errors': 'You do not have permission to delete notes from this video.'}), 403

    db.session.delete(note)
    db.session.commit()
    return jsonify({'message': 'Note deleted successfully'})
