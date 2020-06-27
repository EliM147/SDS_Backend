var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require("express-validator");
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;


var app = express();



//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// Connect to mongoose
Users = require('./users');

mongoose.connect('mongodb://localhost/customerapp');
var db2 = mongoose.connection;


// Set Static path
app.use(express.static(path.join(__dirname, 'public')));

// Global vars

app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

app.use(expressValidator());



app.get('/', function(req, res){
    db.users.find(function (err, docs) {
      res.render('index', {
        title: 'Customers',
        users: docs
      });
	     // docs is an array of all the documents in mycollection
    })
});


//Get users
app.get('/api/users', function(req,res){
  Users.getUsers(function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  });
});

//Post users

app.post('/api/users', function(req,res){
  var users = req.body;
  Users.addUsers(users, function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  });
});

// Users by ID

app.get('/api/users/:_id', function(req,res){
  Users.getUsersById(req.params._id, function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  });
});

// Update users data

app.put('/api/users/:_id', function(req,res){
  var id = req.params._id;
  var users = req.body;
  Users.updateUsers(id, users, {}, function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  });
});

// Delete User

app.delete('/api/users/:_id', function(req,res){
  var id = req.params._id;
  Users.removeUsers(id, function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  });
});




// Count Users
// https://kb.objectrocket.com/mongo-db/how-to-use-node-js-and-mongodb-to-query-count-1202

app.route('/api/count').get(function(req,res){
    Users.count( {}, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.json(result)

        }
   })
})



// Post & Delete functionality on the main page

app.post('/users/add', function(req, res){

  req.checkBody("first_name", "first name is required").notEmpty();
  req.checkBody("last_name", "last name is required").notEmpty();
  req.checkBody("email", "email is required").notEmpty();

  var errors = req.validationErrors();

  if(errors){
      res.render('index', {
        title: 'Customers',
        users: users,
        errors: errors
      });
  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }

    db.users.insert(newUser, function(err, result){
      if(err){
        console.log(err);
      }
      res.redirect('/');
    });
  }
});

// Delete Users Link button in UI

app.delete('/users/delete/:id', function(req, res){
  db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
    if(err){
      console.log(err);
    }
    res.redirect('/');
  });
});


app.listen(3000, function(){
  console.log('Server Started on port 3000');
})
