const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 300,
  },
  content: {
    type: String,
    required: true,
    max: 50000,
  },
  image: {
     type: String,
     required: true,
     default:"" 
    },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  draft:{
    type:Boolean,
    default: false,
  },
  comments: { 
    type: Array ,
    default: []
  },
  tags:{
    type: Array,
     default: "blog"
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
