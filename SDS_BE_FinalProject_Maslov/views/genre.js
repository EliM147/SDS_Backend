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

// Function to get Genres to access from the route

module.exports.getUsers = function(callback, limit){
    Users.find(callback).limit(limit);
}
