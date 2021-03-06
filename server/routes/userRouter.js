const { Router } = require("express");

const { UserController } = require("../controllers");

const router = Router();

router.post("/oauth", UserController.oauth);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
