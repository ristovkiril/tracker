const express = require('express');
const {products} = require("../data/data");
const router = express.Router();


router.get("/", (req, res) => {
    res.json(products.map(product => {
        const {id, name, image, price} = product;
        return {id, name, image, price}
    }));
})
router.get("/:id", (req, res) => {
    const {id} = req.params;
    const product = products.find(p => p.id === Number(id));
    if (!product) {
        return res.status(404).send("Product Not Found");
    }

    return res.status(200).json(product);
})

module.exports = router;