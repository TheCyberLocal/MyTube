from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UserUpdateForm


user_routes = Blueprint('users', __name__)


@user_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_user(id):
    if current_user.id != id:
        return jsonify({'errors': 'You do not have permission to update this user.'}), 403

    user = User.query.get_or_404(id)
    form = UserUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        if form.data.username:
            user.username = form.data.username
        if form.data.email:
            user.email = form.data.email
        if form.data.name:
            user.name = form.data.name
        if form.data.theme:
            user.theme = form.data.theme
        if form.data.language:
            user.language = form.data.language
        db.session.commit()
        return jsonify(user.to_dict())
    return jsonify({'errors': form.errors}), 400


@user_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    if current_user.id != id:
        return jsonify({'errors': 'You do not have permission to delete this user.'}), 403

    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})
