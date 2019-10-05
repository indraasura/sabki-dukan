from flask import Flask, request, jsonify, render_template
from decouple import config
from flask_cors import CORS
from jinja2 import Template
import requests
import base64

# set the project root directory as the static folder, you can set others.
app = Flask(__name__,
            static_url_path='',
            static_folder='client/build')

CORS(app)

global_dict = {}
print('RUNNING NOW')


# https://github.com/login/oauth/authorize?client_id=Iv1.91c5e06562a19419

def get_access_token(code):
    url = "https://github.com/login/oauth/access_token"
    payload = {'client_id': config('GITHUB_CLIENT_ID'),
               'client_secret': config('GITHUB_CLIENT_SECRET'),
               'code': code}
    headers = {
        'content-type': "application/json",
    }
    response = requests.request("POST", url, json=payload, headers=headers)
    return response.text.split('&')[0].split('=')[-1]


def generate_template(data):
    with app.app_context():
        base_template = data['template_base'].split('_')
        base_template = '_'.join(base_template[1:]) + '_' + base_template[0] + '.html'
        nav_bar_template = data['template_nav'].split('_')
        nav_bar_template = '_'.join(nav_bar_template[1:]) + '_header.html'
        footer_template = data['template_footer'].split('_')
        footer_template = '_'.join(footer_template[1:]) + '_' + footer_template[0] + '.html'
        nav_bar = Template(render_template(nav_bar_template, logo='TEST'))
        footer = Template(render_template(footer_template))
        html = render_template(base_template, header=nav_bar, footer=footer, title='WEBSITE',
                               shop_name=data['shop_name'], shop_content=shop_content)
        print(type(html))
    return html


def get_username(token):
    url = "https://api.github.com/user"

    headers = {
        'Authorization': "token " + token,
    }

    response = requests.request("GET", url, headers=headers)
    print('get username', response)
    if response.status_code == 200:
        return response.json()['login']
    else:
        return None


def create_github_pages(token):
    url = "https://api.github.com/user/repos"
    username = get_username(token)
    github_pages = username + '.github.io'

    payload = {"name": github_pages,
               "description": "Website made using Github Pages",
               "homepage": github_pages,
               "private": False,
               "has_issues": True,
               "has_projects": True,
               "has_wiki": True
               }
    headers = {
        'content-type': "application/json",
        'authorization': "token " + token,
    }

    response = requests.request("POST", url, json=payload, headers=headers)
    print('github pages', response)
    if response.status_code == 201:
        return github_pages
    print(response.text)


def commit_frontend_code(token, username, repo, data):
    url = "https://api.github.com/repos/" + username + "/" + repo + "/contents/index.html"
    # print(url, len(data), data, token)

    payload = {
        "message": "index.html Added",
        "committer": {
            "name": "OctoCat",
            "email": "octocat@github.com"
        },
        "content": data
    }
    headers = {
        'content-type': "application/json",
        'Authorization': "token " + token,
    }

    response = requests.request("PUT", url, json=payload, headers=headers)
    print(response, response.text)
    if response.status_code == 201:
        return True
    else:
        return False


@app.route('/start', methods=['POST'])
def start_website():
    token = request.json['token']
    data = request.json['data']
    github_pages = create_github_pages(token)
    html_string = generate_template(data)
    html_byte = str.encode(html_string)
    html_b64 = base64.b64encode(html_byte)
    html_b64_string = str(html_b64)[2:-1]
    commit = commit_frontend_code(token, github_pages[:-10], github_pages, html_b64_string)
    if commit:
        return jsonify({'status': True}), 200
    else:
        return jsonify({'status': False}), 500


@app.route('/')
def root():
    print('ROOT')
    global global_dict
    code = request.args.get('code')
    print('requesting', request.args)
    print('code', code, global_dict)
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
