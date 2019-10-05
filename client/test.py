from flask import render_template, app, Flask
from jinja2 import Template
from json import loads

json_data = \
"""
[
    ["base",[
        "html","panda_dark_base.html"
    ]], 
    ["header",[
        "html","panda_dark_header.html"
    ],[
        "logo","myLogo"
    ]], 
    ["footer",[
        "html", "
    ]]
]
"""

app = Flask(__name__)
data = dict(loads(json_data))
values = []
def getHtml(data):
    for value in data.values():
        values.append(value)
    with app.app_context():
        navbar = Template(render_template(values[1]))
        footer = Template(render_template(values[2]))
        html = render_template(values[0], header=navbar, footer=footer)
        print(html)

print(data)
