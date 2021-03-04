const { verifyToken } = require('../helpers')


module.exports = (req, res, next) => {

  try {
    if(req.headers.access_token) {
      req.loggedUser = verifyToken(req.headers.access_token)
      next()
    } else {
      next({
        code: 400,
        message: 'Invalid Token'
      })
    }
  } catch (error) {
    next({
      code: 500,
      message: 'Internal Server Error'
    })
  }


};
