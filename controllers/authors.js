const Author = require("../models/author");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ErrorResponse } = require("../utils/ErrorResponse");


const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.json(author).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

const createAuthor = async (req, res) => {
  try {
    const profilePicture = req.file.secure_url;
    const {
      name,
      username,
      email,
      password,
      city,
      personalInfo,
      role,
      createdAt,
    } = req.body;

    const author = await Author.findOne({ email });

    if (author) throw new ErrorResponse("Author already exists", 400);

    const hashed = await bcrypt.hash(password, 10);

    const newAuthor = await Author.create({
      name,
      username,
      email,
      password: hashed,
      profilePicture,
      city,
      personalInfo,
      role,
      createdAt,
    });

    const payload = {
      name: newAuthor.name,
      username: newAuthor.username,
      email: newAuthor.email,
      profilePicture: newAuthor.profilePicture,
      city: newAuthor.city,
      personalInfo: newAuthor.personalInfo,
      role: newAuthor.role,
      createdAt: newAuthor.createdAt,
      id: newAuthor._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "500m",
    });

    res.cookie("access_token", token, { maxAge: 6000 * 500, httpOnly: true });
    res.json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
    //next(error);
  }
};

const updateAuthor = async (req, res) => {
  try {
    const body = req.body;
    const author = await Author.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    res.json(author).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    res.json(author).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message }).send(error.message);
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
}; // Path: routes/authors.js
