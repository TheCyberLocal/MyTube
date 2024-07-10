from flask import Blueprint, request, jsonify
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries.
    """
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by ID and returns that user in a dictionary.
    """
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

@user_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_user(id):
    """
    Update a user profile by ID.
    """
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
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})
