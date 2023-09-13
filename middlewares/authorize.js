const authorize = (role) => {
  return (req, res, next) => {
    if (req.author && req.author.role === role) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  };
};

// const authorizeUser = authorize("");
// const authorizeAdmin = authorize("admin");

module.exports = {
  authorize,
  //   authorizeUser,
  //   authorizeAdmin,
};
