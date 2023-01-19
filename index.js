const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { connection } = require("./Config/db");

const app = express()
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        await connection;
        console.log("Connected successfully");
    } catch (err) {
        console.log("Failed to connect with DB");
        console.log(err);
    }
    console.log(`listening on Port :  ${PORT}`);
});