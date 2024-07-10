from flask import Blueprint, request, jsonify
from app.models import User, db
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in.
    """
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter((User.email == form.data['credential']) | (User.username == form.data['credential'])).first()
        if user and user.check_password(form.data['password']):
            login_user(user)
            return jsonify(user.to_dict())
    return jsonify({'errors': {'credential': ['Invalid email/username or password.']}}), 401

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out.
    """
    logout_user()
    return jsonify({'message': 'User logged out'})

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in.
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            name=form.data['name'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify(user.to_dict())
    return jsonify({'errors': form.errors}), 401
