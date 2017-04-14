var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  postTitle: { type: 'String', required: true },
  postCategory: { type: 'String' },
  userId: { type: 'String' },
  postDescription: { type: 'String', required: true },
  date: { type: 'Date', default: Date.now, required: true },
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;

