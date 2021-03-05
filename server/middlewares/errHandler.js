module.exports = (err, req, res, next) => {
  let errMessage = {
    status: 500,
    message: "Internal Server Error",
  };

  const { data } = err;
  switch (data.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      errMessage = {
        ...errMessage,
        status: 400,
        message: data.errors[0].message,
      };
      break;
    case "Invalid Email or Password":
    case "Some field can't be empty":
      errMessage = {
        ...errMessage,
        status: 400,
        message: data.name,
      };
      break;
    default:
      break;
  }

  res.status(errMessage.status).json({ message: errMessage.message });

  // if(err.code === 400) {
  //   res.status(err.code).json({message: err.message})
  // }
  // else if (err.code === 401) {
  //   res.status(err.code).json({message: err.message})
  // }
  // else if (err.code === 500) {
  //   res.status(err.code).json({message: err.message})
  // }
  // else {
  //   const error = err.errors.map(el => {
  //     return {message: el.message}
  //   })
  //   res.status(500).json(error)
  // }
};
