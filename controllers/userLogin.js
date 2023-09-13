const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Authors = require("../models/author");
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

    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new ErrorResponse("User doesn't exist", 404);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new ErrorResponse("Wrong password", 401);

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      userWishWelcome: user.userWishWelcome,
      role: user.role,
      createdAt: user.createdAt,
      personalInfo: user.personalInfo,
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
    const userId = req.user.id;
    const user = await User.findOne({ userId });
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {  login,   logout, getProfile };
