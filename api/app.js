const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const routes = require("./routes");
app.use(cors());
app.use(bodyParser.json());
process.env.SECRET_KEY = require("crypto")
  .randomBytes(64)
  .toString("hex");
  console.log(process.env.SECRET_KEY)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());
app.use("/", routes);
module.exports = app;
