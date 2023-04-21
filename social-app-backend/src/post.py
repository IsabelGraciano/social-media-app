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
    authorId = request.json['author']
    # author = users_db().find_one({'_id': ObjectId(authorId)})
    
    caption = request.json['caption']
    image = request.json['image']

    current_time = datetime.now()

    id = posts_db().insert_one({
        'author': ObjectId(authorId),
        'caption': caption,
        'image': image,
        'likes': 0,
        'comments': [],
        'createdAt': current_time,
        'updatedAt': current_time
    })

    return jsonify({'post': str(id)})