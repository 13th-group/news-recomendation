const { Router } = require("express");

const { NewsController } = require("../controllers");

const router = Router();

router.get("/news", NewsController.findAll);

module.exports = router;
