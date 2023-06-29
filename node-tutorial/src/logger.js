const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const date = new Date();

    console.log(`${method} ${url} [${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}]`);
    next();
}

module.exports = logger;