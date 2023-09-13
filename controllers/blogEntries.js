const Blog = require("../models/blog");

const fs = require("fs");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ draft: false }).populate("author");
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
    const { title, content, image, author, draft, createdAt, comments, tags } =
      req.body;

    let post = await Blog.create({
      title,
      content,
      image,
      author,
      draft,
      createdAt,
      comments,
      tags,
    });

    res.json(post).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, image, author, draft, createdAt, comments, tags } =
      req.body;

    let post = await Blog.findByIdAndUpdate(req.params.id, {
      title,
      content,
      image,
      author,
      draft,
      createdAt,
      comments,
      tags,
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
}

  module.exports = {getBlogs, getBlog, createBlog, updateBlog, deleteBlog, getDrafts };
