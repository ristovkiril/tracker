const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: password,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.EXPRESS_JS_SECRET_TOKEN,
            {
                expiresIn: "240h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json({email, token, first_name, last_name});
    } catch (err) {
        console.log(err);
    }
});

router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            return res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && user.comparePassword(password)) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.EXPRESS_JS_SECRET_TOKEN,
                {
                    expiresIn: "240h", // 10days
                }
            );

            // save user token
            user.token = token;

            // user
            return res.status(200).json({email, token, last_name: user.first_name, first_name: user.last_name});
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
    // Our register logic ends here
});


module.exports = router;
