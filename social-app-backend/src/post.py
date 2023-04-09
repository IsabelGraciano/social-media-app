from flask import jsonify, request, Blueprint
from flask_pymongo import ObjectId
from database import mongo
from datetime import datetime

post = Blueprint('post', __name__)

def users_db():
    return mongo.db.users

def posts_db():
    return mongo.db.posts

@post.route('/create', methods=['POST'])
def createPost():
    username = request.json['username']
    author = users_db().find_one({'username': username})
    
    caption = request.json['caption']
    image = request.json['image']

    current_time = datetime.now()

    id = posts_db().insert_one({
        'author': author['_id'],
        'caption': caption,
        'image': image,
        'likes': 0,
        'comments': [],
        'createdAt': current_time,
        'updatedAt': current_time
    })

    return jsonify({'post': id})