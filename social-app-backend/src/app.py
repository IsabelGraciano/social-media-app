from flask import Flask
from flask_cors import CORS
from database import mongo


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://gracianoisabel1:l81v0jlOpTqY4Lm7@social-media.jsjthoo.mongodb.net/social-media?retryWrites=true&w=majority'
mongo.init_app(app)

from user import user

CORS(app)

app.register_blueprint(user, url_prefix='/users')


if __name__ == '__main__':
    app.run(debug=True)