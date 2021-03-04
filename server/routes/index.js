const { Router } = require("express");

const newsRouter = require("./newsRouter");
const userRouter = require("./userRouter");

const router = Router();

router.use("/", newsRouter);
router.use("/", userRouter);

module.exports = router;
