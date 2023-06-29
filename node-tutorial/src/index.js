const express = require("express");
const {products} = require("./data/data")
const logger = require("./logger");
const authorize = require("./authorize");
const morgan = require('morgan');

const app = express();
// app.use([logger, authorize]);
app.use(morgan("tiny"));


app.get("/", (req, res) => {
    res.send("<a href=\"/api/products\">List products</a>");
})

app.get("/api/products", (req, res) => {
    res.json(products.map(product => {
        const {id, name, image, price} = product;
        return {id, name, image, price}
    }));
})
app.get("/api/products/:id", (req, res) => {
    const {id} = req.params;
    const product = products.find(p => p.id === Number(id));
    if (!product) {
        return res.status(404).send("Product Not Found");
    }

    return res.status(200).json(product);
})

app.listen(5000, () => console.log("Sever is started http://localhost:5000"))