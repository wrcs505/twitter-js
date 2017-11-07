const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');



module.exports = function (io) {
  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets: tweets, showForm: true } );
  });

  router.get('/users/:name', function(req, res) {
    var splitName = req.params.name.split(' ');
    var lowerName = splitName.map(function(name) {
      name = name.toLowerCase()
      name = name.charAt(0).toUpperCase() + name.slice(1)
      return name;
    })
    var name = lowerName.join(' ');
    // var name = req.params.name
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: list, showForm: true, name: name} );
  });

  router.get('/tweets/:id', function (req, res) {
    let tweetID = parseInt(req.params.id, 10)
    let list = tweetBank.find({id: tweetID})
    res.render( 'index', { tweets: list } );
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    var newTweet = tweetBank.add(name, text);
    io.sockets.emit('newTweet', {name, text});
    res.redirect('/');
  });
  return router;
};
