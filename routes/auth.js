const express = require("express");
const { login, logout, getProfile } = require("../controllers/userLogin");
const { verifyToken } = require("../middlewares/verifyToken");
const { authorize } = require("../middlewares/authorize");
const { isAccountOwner } = require("../middlewares/isAccountOwner");

const authRouter = express.Router();
authRouter.get("/profile", verifyToken, authorize("user"), getProfile);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

module.exports = authRouter;
