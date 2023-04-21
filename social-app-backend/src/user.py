from flask import jsonify, request, Blueprint
from flask_pymongo import ObjectId
from flask_bcrypt import Bcrypt
from database import mongo

user = Blueprint('user', __name__)
bcrypt = Bcrypt()

def db():
    return mongo.db.users

@user.route('/validate-creation', methods=['POST'])
def validateUserCreation():
    username = request.json['username']
    email = request.json['email']

    usernameAlreadyExists = bool(db().find_one({'username': username}))
    emailAlreadyExists = bool(db().find_one({'email': email}))

    return jsonify({
        'emailExists': emailAlreadyExists,
        'usernameExists': usernameAlreadyExists
    })

@user.route('/login', methods=['POST'])
def validateLogin():
    username = request.json['username']
    password = request.json['password']

    targetUser = db().find_one({'username': username})

    if targetUser is not None and bcrypt.check_password_hash(targetUser['password'], password):
        print(targetUser['_id'])
        return jsonify({'user': str(targetUser['_id'])})
    else:
        return jsonify({'error': True})
        

@user.route('/create', methods=['POST'])
def createUser():
    hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('utf-8')
    id = db().insert_one({
        'name': request.json['name'],
        'username': request.json['username'],
        'email': request.json['email'],
        'password': hashed_password,
    })
    return jsonify(str(id.inserted_id))

@user.route('/get', methods=['GET'])
def getUsers():
    users = []
    for doc in db().find():
        users.append({
            '_id': str(doc['_id']),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password'],
        })
    return jsonify(users)

@user.route('/get/<id>', methods=['GET'])
def getUser(id):
    user = db().find_one({
        '_id': ObjectId(id),
    })

    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'password': user['password']
    })

@user.route('/delete/<id>', methods=['DELETE'])
def deleteUser(id):
    db().delete_one({
        '_id': ObjectId(id),
    })
    return jsonify({'msg': 'Usuario elminado'})

@user.route('/update/<id>', methods=['PUT'])
def updateUser(id):
    db().update_one({'_id': ObjectId(id)},
        {
            '$set': {
                'name': request.json['name'],
                'email': request.json['email'],
                'password': request.json['password']
            }
        }
    )
    return jsonify({'msg': 'Usuario actualizado'})