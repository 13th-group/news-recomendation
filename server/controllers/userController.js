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
      res.status(500).json(err);
    }
  }

  static register(req, res, next) {
    let newUser = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(newUser)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      next(err)
    })
  }

  static login(req, res, next) {

    const email = req.body.email
    const password = req.body.password

    User.findOne({
      where : { email }
    })
    .then(user => {
      if (user) {
        const comparedPasswords = comparePassword(password, user.password)

        if (comparedPasswords) {
          const payload = {
            id:user.id,
            email:user.email
          }

          const accessToken = getToken(payload)
          res.status(200).json({accessToken})
        } 
        else {
          next({
            code: 400,
            message : 'Invalid Email or Password'
          })
        }
      }
      else {
        next({
          code: 400,
          message : 'Invalid Email or Password'
        })
      }
    })
    .catch(err => {
      next({
        code: 500,
        message: 'Internal Server Error'
      })
    })

  }

}

module.exports = Controller;
