const Author = require('../models/author');
const fs = require('fs');

const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors).status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message }).send(error.message);
    }
}

const getAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        res.json(author).status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message }).send(error.message);
    }
}

const createAuthor = async (req, res) => {
    try {
        const { name, username, email, password, profilePicture, city, personalInfo, role, createdAt } = req.body;
        const author = await Author.create({
            name,
            username,
            email,
            password,
            profilePicture,
            city,
            personalInfo,
            role,
            createdAt
        });
        res.json(author).status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message }).send(error.message);
    }
}

const updateAuthor = async (req, res) => {
    try {
        const body = req.body;
        const author = await Author.findByIdAndUpdate(req.params.id, body,   { new: true }); 
        res.json(author).status(200);
    }
    catch (error) {
        res.status(500).json({ message: error.message }).send(error.message);
    }
}

const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        res.json(author).status(200);
    }catch (error) {
        res.status(500).json({ message: error.message }).send(error.message);
    }
}

module.exports = {
    getAuthors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
}   // Path: routes/authors.js