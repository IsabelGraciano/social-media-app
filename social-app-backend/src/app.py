from flask import Flask
from flask_cors import CORS
from database import mongo
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
mongo.init_app(app)

from user import user
from post import post

CORS(app)

app.register_blueprint(user, url_prefix='/users')
app.register_blueprint(post, url_prefix='/posts')


if __name__ == '__main__':
    app.run(debug=True)