const { Router } = require("express");
const auth = require('../middlewares/auth')


const newsRouter = require("./newsRouter");
const userRouter = require("./userRouter");

const router = Router();

router.use("/", userRouter);

router.use(auth)

router.use("/", newsRouter);


module.exports = router;
