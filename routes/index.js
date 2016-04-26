var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var swig = require('swig');

//CONFIGURE ROUTES




router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  console.log(tweets);
  res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
});
router.get('/users/:name', function(request, response, next) {
  var name = request.params.name;
  var list = tweetBank.find( {name: name} );
  console.log(list);
  response.render( 'index', { title: 'Twitter.js - Posts by ' + name, tweets: list});
});
router.get('/tweets/:id', function(request, response, next){
  var id = request.params.id;
  var list = tweetBank.find( {id: Number(id)} );
  console.log(list);
  response.render( 'index', { title: 'TwitterClone: a single tweet with ID ' + id, tweets: list});
});
router.post('/tweets/', function(request, response, next){
  var formData = request.body;
  var name = formData.name;
  var text = formData.text;
  tweetBank.add(name, text);
  response.redirect('/');
})

module.exports = router;
