const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_DB = process.env.MONGO_DB

const connection = mongoose.connect(MONGO_DB);
module.exports = { connection };