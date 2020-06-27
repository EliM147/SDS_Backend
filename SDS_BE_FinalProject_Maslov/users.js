var mongoose = require('mongoose');

// Users Schema = just for the application

var usersSchema = mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  }
});

var Users = module.exports = mongoose.model('Users', usersSchema);

// Function to get Users to access from the route

module.exports.getUsers = function(callback, limit){
    Users.find(callback).limit(limit);
}

// Function to get a user by id to access from the route

module.exports.getUsersById = function(id, callback){
    Users.findById(id, callback);
}

// Add a User using json / resteasy API
module.exports.addUsers = function(users, callback){
    Users.create(users, callback);
}

// Update Users
module.exports.updateUsers = function(id, users, options, callback){
    var query = {_id:id};
    var update = {
      first_name: users.first_name,
      last_name: users.last_name,
      email: users.email
    }
    Users.findOneAndUpdate(query, update, options, callback);
}

// Delete Users
module.exports.removeUsers = function(id, callback){
    var query = {_id:id};
    Users.remove(query, callback);
}
