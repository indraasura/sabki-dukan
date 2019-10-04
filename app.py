from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# set the project root directory as the static folder, you can set others.
app = Flask(__name__,
            static_url_path='',
            static_folder='client/build')

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/users/ping')
def ping_pong():
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    })