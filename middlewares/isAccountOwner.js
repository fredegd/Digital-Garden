const { ErrorResponse } = require("../utils/ErrorResponse");

const isAccountOwner = (req, res, next) => {
  try {
    console.log(req.author.username)
    if (req.author.username === req.params.username) {

        next()
    }else{
        throw new ErrorResponse("Not Allowed to get access to the Content", 403)
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAccountOwner,
};
