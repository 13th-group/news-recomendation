const { OAuth2Client } = require("google-auth-library");

const { User } = require("../models");
const { getToken } = require("../helpers");

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
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
