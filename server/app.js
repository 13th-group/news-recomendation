if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const router = require("./routes");
const { errHandler } = require("./middlewares");

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use("/", router);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
