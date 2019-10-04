from flask import Flask, request, jsonify
from decouple import config
from flask_cors import CORS
import requests

# set the project root directory as the static folder, you can set others.
app = Flask(__name__,
            static_url_path='',
            static_folder='client/build')

CORS(app)

global_dict = {}
print('RUNNING NOW')

# https://github.com/login/oauth/authorize?client_id=Iv1.91c5e06562a19419

def get_access_token(code):
    print('GETTING ACCESS TOKEN')
    url = "https://github.com/login/oauth/access_token"
    print('URL')
    payload = {'client_id': config('GITHUB_CLIENT_ID'),
               'client_secret': config('GITHUB_CLIENT_SECRET'),
               'code': code}
    print('PAYLOAD DONE')
    headers = {
        'content-type': "application/json",
    }
    print('headers done')
    print('0-----------------------------------------------------------------------')
    response = requests.request("POST", url, json=payload, headers=headers)
    print(response, response.text, type(response.text))
    print('-------------------------------------------------------------------------')
    return response.text.split('&')[0].split('=')[-1]


@app.route('/')
def root():
    global global_dict
    code = request.args.get('code')
    print(request.args)
    print(code, global_dict)
    if code and code not in global_dict:
        access_token = get_access_token(code)
        print('GOT ', access_token)
        if access_token:
            global_dict[code] = access_token
    return app.send_static_file('index.html')


@app.route('/github/access_token/<code>', methods=['GET'])
def get_github_access_token(code):
    global global_dict
    print(global_dict)
    if code in global_dict:
        return jsonify({'token': global_dict[code]})
    else:
        return jsonify({'token': None}), 200


@app.route('/users/ping')
def ping_pong():
    return jsonify({
        'status': 'success',
        'message': 'pong!'
    }), 200

@app.route('/hello/<id>')
@app.route('/hello/', defaults={'id': None})
def hey(id):
    print(id)
    return 'Hey'

@app.route('/github/webhook')
def github_webhook():
    code = request.args.get('code')


if __name__ == '__main__':
    app.run()