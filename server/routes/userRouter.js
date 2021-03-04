const { Router } = require("express");

const { UserController } = require("../controllers");

const router = Router();

router.post("/oauth", UserController.oauth);

module.exports = router;
