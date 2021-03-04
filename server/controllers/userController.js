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
      res.status(500).json(err)
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
          res.status(400).json({message : 'Invalid email or Password'})
        }
      }
      else {
        res.status(400).json({message : 'Invalid email or Password'})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })

  }

}

module.exports = Controller;
