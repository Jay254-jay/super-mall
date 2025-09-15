const productModel = require("../models/productModel");

exports.createProduct = (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;
    productModel.createProduct(name, price, description, image)
        .then(result => {
            res.status(201).json({ message: 'Product created', result });
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error creating product.");
        });
};

exports.getAllProducts = (req, res) => {
    productModel.getAllProducts()
        .then(products => {
            res.json(products);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

exports.getProductDetailsById = (req, res) => {
    const productId = req.params.id;
    productModel.getProductDetailsById(productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching product.");
        });
};

exports.allOrderByProductId = (req, res) => {
    const productId = req.params.id;
    productModel.allOrderByProductId(productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching product.");
        });
};

exports.updateProduct = (req, res) => {
    const { id, name, price, description } = req.body;
    productModel.updateProduct(id, name, price, description)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error updating product.");
        });
};

exports.deleteProduct = (req, res) => {
    const productId = req.params.id;
    productModel.deleteProduct(productId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error deleting product.");
        });
};