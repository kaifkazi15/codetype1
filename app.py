import os
from flask import Flask, render_template, redirect, url_for, request, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'codetype_cyberpunk_secret_key_2026'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///codetype.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'index'

# ----------------- DATABASE MODELS -----------------

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    results = db.relationship('Result', backref='user', lazy=True)

class Result(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wpm = db.Column(db.Integer, nullable=False)
    accuracy = db.Column(db.Float, nullable=False)
    errors = db.Column(db.Integer, nullable=False)
    language = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# ----------------- ROUTES -----------------

# 1. Login Page Route (Ab is par sirf login form load hoga)
@app.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('practice'))
    return render_template('index.html')

# 2. Register Page Route (Alag se registration page kholne ke liye)
@app.route('/register_page')
def register_page():
    if current_user.is_authenticated:
        return redirect(url_for('practice'))
    return render_template('register.html')

# 3. Signup Process Route
@app.route('/signup', methods=['POST'])
def signup():
    username = request.form.get('username').strip()
    email = request.form.get('email').strip()
    password = request.form.get('password')

    user_exists = User.query.filter((User.username == username) | (User.email == email)).first()
    if user_exists:
        flash('Username ya Email pehle se register hai!', 'error')
        return redirect(url_for('register_page'))

    hashed_pw = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, email=email, password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    
    flash('Account successfully ban gaya! Ab login karein.', 'success')
    return redirect(url_for('index'))

# 4. Login Process Route
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username').strip()
    password = request.form.get('password')

    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password, password):
        login_user(user)
        return redirect(url_for('practice'))
    
    flash('Galat Username ya Password!', 'error')
    return redirect(url_for('index'))

# 5. Logout Route
@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

# 6. Practice Section Route
@app.route('/practice')
@login_required
def practice():
    return render_template('practice.html')

# 7. User Profile Edit Route (NAYA ADDED FEATURE)
@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    if request.method == 'POST':
        new_username = request.form.get('username').strip()
        new_email = request.form.get('email').strip()

        # Check karna ki naya username/email kisi aur ne toh nahi le rakha
        existing_user = User.query.filter((User.username == new_username) | (User.email == new_email)).first()
        
        if existing_user and existing_user.id != current_user.id:
            flash('Yeh Username ya Email pehle se kisi aur ka hai!', 'error')
        else:
            current_user.username = new_username
            current_user.email = new_email
            db.session.commit()
            flash('Profile successfully update ho gayi!', 'success')
            return redirect(url_for('profile'))

    return render_template('profile.html')

# 8. API Score Save Route
@app.route('/api/save-score', methods=['POST'])
@login_required
def save_score():
    data = request.get_json()
    if not data:
        return jsonify({"status": "error", "message": "No data received"}), 400

    new_result = Result(
        wpm=int(data['wpm']),
        accuracy=float(data['accuracy']),
        errors=int(data['errors']),
        language=data['language'],
        user_id=current_user.id
    )
    db.session.add(new_result)
    db.session.commit()
    return jsonify({"status": "success", "message": "Score saved successfully!"})

# 9. Dashboard Route
@app.route('/dashboard')
@login_required
def dashboard():
    user_results = Result.query.filter_by(user_id=current_user.id).all()
    total_tests = len(user_results)
    avg_wpm = sum([r.wpm for r in user_results]) // total_tests if total_tests > 0 else 0
    avg_acc = sum([r.accuracy for r in user_results]) / total_tests if total_tests > 0 else 0
    
    return render_template('dashboard.html', results=user_results, total_tests=total_tests, avg_wpm=avg_wpm, avg_acc=round(avg_acc, 2))

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)