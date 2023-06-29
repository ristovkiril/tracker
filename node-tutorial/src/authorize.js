const authorize = (req, res, next) => {
    const {name} = req.query;
    if (name) {
        req.user = {name: name, id: 1};
        next();
    }
    else {
        console.log("BAD REQUEST: User not authorized");
        res.status(401).send("Not authorized");
    }
}

module.exports = authorize;