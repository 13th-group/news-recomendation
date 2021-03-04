const { User } = require("../models");

class Controller {
  static async findAll(req, res) {
    try {
      const user = await User.findAll();
    } catch (err) {}
  }
}

module.exports = Controller;
