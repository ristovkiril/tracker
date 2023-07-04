const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = async (req, res, next) => {
    const authorization =
        req?.headers?.authorization || req.body.token || req.query.token || req.headers["x-access-token"];
    if (!authorization) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const token = authorization?.replace("Bearer ", "");
        const {email} = jwt.verify(token, process.env.EXPRESS_JS_SECRET_TOKEN);
        const user = await User.findOne({ email });
        req.user = user;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};