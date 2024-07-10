from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)

@user_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_user(id):
    """
    Update a user profile by ID.
    """
    if current_user.id != id:
        return jsonify({'errors': 'You do not have permission to update this user.'}), 403

    user = User.query.get_or_404(id)
    data = request.get_json()
    user.username = data.get('username', user.username)
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.theme = data.get('theme', user.theme)
    user.language = data.get('language', user.language)
    db.session.commit()
    return jsonify(user.to_dict())

@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Delete a user by ID.
    """
    if current_user.id != id:
        return jsonify({'errors': 'You do not have permission to delete this user.'}), 403

    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})
