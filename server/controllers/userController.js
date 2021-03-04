const { User } = require('../models')

const { comparePassword, getToken } = require('../helpers')

class Controller {

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
