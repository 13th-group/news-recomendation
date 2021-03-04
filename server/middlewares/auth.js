const { verifyToken } = require('../helpers')


module.exports = (req, res, next) => {

  try {
    if(req.headers.access_token) {
      req.loggedUser = verifyToken(req.headers.access_token)
      next()
    } else {
      res.status(400).json({message : 'Invalid Token'})
    }
  } catch (error) {
    res.status(500).json(err)
  }


};
