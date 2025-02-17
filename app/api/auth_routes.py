from flask import Blueprint, request, jsonify
from app.models import User, db
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import or_


auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return jsonify({'errors': form.errors}), 401

    user = User.query.filter(or_(User.email == form.credential.data, User.username == form.credential.data)).first()
    login_user(user)
    return jsonify(user.to_dict())


@auth_routes.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'User logged out'})


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not form.validate_on_submit():
        return jsonify({'errors': form.errors}), 401

    cleanUser = User(
        username=form.username.data,
        name=form.name.data,
        email=form.email.data,
        password=form.password.data
    )
    db.session.add(cleanUser)
    db.session.commit()
    login_user(cleanUser)
    return jsonify(cleanUser.to_dict())

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
