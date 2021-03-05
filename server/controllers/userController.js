const { OAuth2Client } = require("google-auth-library");

const { User } = require("../models");
const { comparePassword, getToken } = require("../helpers");

class Controller {
  static async oauth(req, res, next) {
    try {
      const id_token = req.body.id_token;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID,
      });
      const { email } = ticket.getPayload();

      const user = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          email,
          password: `${Math.floor(Math.random() * 1e6)}`,
        },
      });

      const token = getToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({ access_token: token });
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async register(req, res, next) {
    try {
      const newUser = {
        email: req.body.email,
        password: req.body.password,
      };
      const user = await User.create(newUser);
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      next({
        data: err,
      });
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "Invalid Email or Password" };
      }

      if (!comparePassword(password, user.password)) {
        throw { name: "Invalid Email or Password" };
      }

      const access_token = getToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({ access_token });
    } catch (err) {
      next({
        data: err,
      });
    }
  }
}

module.exports = Controller;
