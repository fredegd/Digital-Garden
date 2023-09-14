const Blog = require("../models/blog");

const fs = require("fs");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    res.json(blogs).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author");
    res.json(blog).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

const createBlog = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const blogImage = req.file.secure_url;
    const { title, subtitle, content, author } = req.body;

    console.log(blogImage, "is the blogImage");

    let post = await Blog.create({
      blogImage,
      title,
      subtitle,
      content,
      author,
    });

    res.json(post).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, subtitle, content, author, draft, comments, tags } =
      req.body;

    let post = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      subtitle,
      content,
      author,
      draft,
      tags,
      comments,
    });
    res.json(post).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

const deleteBlog = async (req, res) => {
  try {
    let post = await Blog.findByIdAndDelete(req.params.id);
    res.json(post).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

const getDrafts = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: true }).populate("author");
    res.json(blogs).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getDrafts,
};
