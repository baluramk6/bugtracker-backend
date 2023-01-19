const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../Models/User.Model")

const signinController = express.Router();

signinController.post("/signin", async (req, res) => {

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    const hash = user ? user.password : undefined;

    bcrypt.compare(password, hash, (error, result) => {
        if (error) {
            return res.status(404).send({ message: "User not found" });
        }
        if (result) {
            const token = jwt.sign({ email: email }, process.env.KEY);
            return res.status(200).send({ message: "Login successful", token: token });
        } else {
            return res
                .status(401)
                .send({ message: "Invalid details, please login again" });
        }
    });
});

module.exports = { signinController };
