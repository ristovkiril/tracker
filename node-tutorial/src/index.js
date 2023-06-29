const express = require("express");
const logger = require("./logger");
const authorize = require("./authorize");
const productRoutes = require("./routes/productRoutes");
const morgan = require('morgan');

const app = express();
// app.use([logger, authorize]);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", [authorize, productRoutes])

app.get("/", (req, res) => {
    res.send("<a href=\"/api/products\">List products</a>");
})


app.listen(5000, () => console.log("Sever is started http://localhost:5000"))