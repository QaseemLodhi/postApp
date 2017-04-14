require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var mongoose = require('mongoose');
var config = require('config.json');

mongoose.Promise = global.Promise;

mongoose.connect(config.connectionString, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!');
    throw error;
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(expressJwt({ secret: config.secret }).unless({ path: ['/users/authenticate', '/users/register', '/post/addPost','/post/getPosts', '/post/deletePost/:id'] }));

app.use('/users', require('./controllers/users.controller'));
app.use('/post', require('./controllers/post.controller'));

var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});