const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogImage: {
    type: String,
    // required: true,
    default:"" 
   },
   
  title: {
    type: String,
    required: true,
    max: 300,
  },
  subtitle: {
    type: String,
    required: true,
    max: 300,
  },

  content: {
    type: String,
    required: true,
    max: 50000,
  },
  
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  draft:{
    type:Boolean,
    default: false,
  },
  
  tags:{
    type: Array,
     default: ["blog"]
  },
  comments: { 
    type: Array ,
    default: []
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
