module.exports = (err, req, res, next) => {
  if (!err) {
    return;
  }

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
    case "Please login first":
    case "Invalid Token":
      errMessage = {
        ...errMessage,
        status: 401,
        message: data.name,
      };
      break;
    default:
      break;
  }

  res.status(errMessage.status).json({ message: errMessage.message });
};
