const { verifyToken } = require("../helpers");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.access_token) {
      throw { name: "Please login first" };
    }

    const { id, email } = verifyToken(req.headers.access_token);

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw { name: "Invalid Token" };
    }

    req.loggedUser = {
      id,
      email: user.email,
    };
    next();
  } catch (err) {
    next({
      data: err,
    });
  }
};
