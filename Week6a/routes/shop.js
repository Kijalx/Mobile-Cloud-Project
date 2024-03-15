const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require('fs');
const path = require('path');

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: false }
});

const Product = mongoose.model("Product", productSchema);

router.get("/addProduct", (req, res) => {
    res.send(
        '<form action="/product/add" method="post">' +
        'Name: <input type="text" name="name" /><br />' +
        'Price: <input type="number" name="price" /><br />' +
        '<input type="submit" value="Add Product" />' +
        "</form>"
    );
});

router.post("/product/add", (req, res) => {
    const { name, price, imageUrl } = req.body;

    // Assuming the image data is sent as a base64 string
    // Save the image to a file and store the file path in the database
    if (req.body.image) {
        const base64Image = req.body.image;
        const imageName = `${Date.now()}.png`; // Generate a unique name for the image
        const imagePath = path.join(__dirname, '..', 'uploads', imageName); // Define the path where the image will be saved
        fs.writeFile(imagePath, base64Image, 'base64', (err) => {
            if (err) {
                console.error('Error saving image:', err);
                return res.status(500).send('Failed to save image');
            }
            // Image saved successfully, update the imageUrl field in the database
            new Product({ name, price, imageUrl: imageName })
                .save()
                .then(product => res.json(product))
                .catch(err => res.status(500).send("Failed to add product"));
        });
    } else {
        // If no image is provided, simply save the product without imageUrl
        new Product({ name, price })
            .save()
            .then(product => res.json(product))
            .catch(err => res.status(500).send("Failed to add product"));
    }
});

router.get("/", (req, res) => {
    Product.find()
        .then(products => {
            let responseHtml = "<h2>Products</h2>";
            responseHtml += '<a href="/addProduct"><button>Add New Product</button></a><br/><br/>';
            responseHtml += "<ul>";
            products.forEach(product => {
                responseHtml += `<li><a href="/updateProduct/${product._id}">${product.name}</a> - $${product.price}</li>`;
            });
            responseHtml += "</ul>";
            res.send(responseHtml);
        })
        .catch(err => res.send("No products found"));
});

router.get("/getShop", (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ message: "Failed to find products", error: err }));
});

router.get("/getSpecificProduct/:id", (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.send("Specific Product: " + JSON.stringify(product)))
        .catch(err => res.send("No product found"));
});

router.get("/updateProduct/:id", (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            if (!product) return res.send("No product found with that ID");
            res.send(
                `<h2>Update Product</h2>
                 <form action="/product/update/${product._id}" method="post">
                    Name: <input type="text" name="name" value="${product.name}"/><br />
                    Price: <input type="number" name="price" value="${product.price}"/><br />
                    <input type="submit" value="Update Product"/>
                 </form>
                 <br />
                 <form action="/product/delete/${product._id}" method="post">
                    <input type="submit" value="Delete Product" onclick="return confirm('Are you sure you want to delete this product?');"/>
                 </form>`
            );
        })
        .catch(err => res.status(500).send("Error fetching product"));
});

router.post("/product/update/:id", (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(product => res.json(product))
        .catch(err => res.status(500).send("Failed to update product"));
});

router.post('/product/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/'))
        .catch(err => res.status(500).send('Failed to delete product'));
});

module.exports = router;
