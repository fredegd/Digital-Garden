const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Author = require("../models/author");
const { ErrorResponse } = require("../utils/ErrorResponse");

////////////////////////////////////////////////////
//
//   LOGIN
//
//
//
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const author = await Author.findOne({ email }).select("+password");

    if (!author) throw new ErrorResponse("Author doesn't exist", 404);

    const isMatch = await bcrypt.compare(password, author.password);

    if (!isMatch) throw new ErrorResponse("Wrong password", 401);

    const payload = {
      id: author._id,
      username: author.username,
      email: author.email,
      profilePicture: author.profilePicture,
      role: author.role,
      createdAt: author.createdAt,
      personalInfo: author.personalInfo,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1440m",
    });

    res
      .cookie("access_token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .json(payload);
  } catch (error) {
    next(error);
  }
};


////////////////////////////////////////////////////
//
//   LOGOUT
//
//
//
const logout = async (req, res, next) => {
  try {
    res
      .cookie("access_token", "", {
        maxAge: 0,
        httpOnly: true,
      })
      .send("User is Logged Out");
  } catch (error) {
    next(error);
  }
};


////////////////////////////////////////////////////
//
//   GETPROFILE
//   (similar to as ./controllers/users-->getUserByUsername)
//
//
const getProfile = async (req, res, next) => {
  try {
    const userId = req.author._id;
    console.log(userId)
    const author = await Author.findOne({ userId });
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

module.exports = {  login,   logout, getProfile };
