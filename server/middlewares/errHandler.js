module.exports = (err, req, res, next) => {

  if(err.code === 400) {
    res.status(err.code).json({message: err.message})
  }
  else if (err.code === 401) {
    res.status(err.code).json({message: err.message})
  }
  else if (err.code === 500) {
    res.status(err.code).json({message: err.message})
  }
  else {
    const error = err.errors.map(el => {
      return {message: el.message}
    })
    res.status(500).json(error)
  }
};
