const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {type: String, default:""},
    username: { type: String, unique: true, required: true  },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    profilePicture: { type: String, default:""},
    city: { type: String, default:""},
    personalInfo: { type: String, default:""},
    role: { type: String, default:""},
    createdAt:{type:Date,default:Date.now}
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;   
