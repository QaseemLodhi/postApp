var Post = require('../models/post');
var config = require('config.json');
var express = require('express');
var router = express.Router();

router.post('/addPost', addPost);
router.get('/getPosts', getPosts);
router.delete('/deletePost/:id', deletePost);

module.exports = router;

function addPost(req, res) {
  if (!req.body.postTitle) {
    return res.status(403).end('Missing Post title!');
  }

  var newPost = new Post(req.body);
  console.log('newPost', newPost);
  newPost.save((err, saved) => {
    if (err) {
      console.log('addpost', err);
      return res.status(500).send(err);
    }
    Post.findOne({ _id: saved._id }).exec((err, post) => {
      if (err) {
        console.log('posterr', err);
        return res.status(500).send(err);
      }
      res.json({ post });
    });
  });
}

function getPosts(req, res) {
  Post.find({}).sort('-date').exec((err, posts) => {
    if (err) {
      console.log('getPosts', err);
      return res.status(500).send(err);
    }
    res.json({ posts });
  });
}

function deletePost(req, res) {
  console.log(req.params);
  Post.findOne({ _id: req.params.id }).exec((err, post) => {
    if (err) {
      console.log('deletePost', err);
      return res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}