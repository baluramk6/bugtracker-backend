const express = require("express")
const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
const { UserModel } = require("../Models/User.Model")

const signupController = express.Router();

signupController.post("/signup", async (req, res) => {

    const { email, password } = req.body;
    const isEmail = await UserModel.findOne({ email });

    if (!isEmail) {
        bcrypt.hash(password, 5, async (error, hash) => {
            if (error) {
                return res.status(500).send({ message: "Something went wrong" });
            }
            const user = new UserModel({
                email,
                password: hash,
            });
            try {
                await user.save();
                return res.status(201).send({ message: "Signup successfully" });
            } catch (error) {
                return res.status(500).send({ message: "Signup failed" });
            }
        });
    } else {
        res.send({
            message: "User already Exists",
        });
    }
});

module.exports = { signupController };
