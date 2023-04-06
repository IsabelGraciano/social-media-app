from flask import Flask, jsonify, request
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
import bcrypt

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb+srv://gracianoisabel1:l81v0jlOpTqY4Lm7@social-media.jsjthoo.mongodb.net/social-media?retryWrites=true&w=majority'
mongo = PyMongo(app) # contexión
db = mongo.db.users

# React crea su propio servidor, para hacer un middleware entre el servidor de react y este servidor que estoy creando para mi backend lo que hago es usar CORS
CORS(app)

@app.route('/users', methods=['POST'])
def createUser():
    hashed_password = bcrypt.hashpw(request.json['password'].encode('utf-8'), bcrypt.gensalt())
    id = db.insert_one({
        'name': request.json['name'],
        'email': request.json['email'],
        'password': hashed_password.decode('utf-8')
    })
    return jsonify(str(id.inserted_id))

@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(doc['_id']),
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password'],
        })
    return jsonify(users)

@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({
        '_id': ObjectId(id),
    })

    return jsonify({
        '_id': str(ObjectId(user['_id'])),
        'name': user['name'],
        'email': user['email'],
        'password': user['password']
    })

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({
        '_id': ObjectId(id),
    })
    return jsonify({'msg': 'Usuario elminado'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id': ObjectId(id)},
        {
            '$set': {
                'name': request.json['name'],
                'email': request.json['email'],
                'password': request.json['password']
            }
        }
    )
    return jsonify({'msg': 'Usuario actualizado'})

if __name__ == "__main__":
    app.run(debug=True)