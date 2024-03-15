const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the product schema without ourId
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    anArray: { type: Array, required: false },
    anObject: { type: Object, required: false },
});

const Product = mongoose.model("Product", productSchema);

// Add product page with form
router.get("/addProduct", (req, res) => {
    res.send(
        '<form action="/product/add" method="post">' +
        'Name: <input type="text" name="name" /><br />' +
        'Price: <input type="number" name="price" /><br />' +
        '<input type="submit" value="Add Product" />' +
        "</form>"
    );
});
// Handle form data to add a product
router.post("/product/add", (req, res) => {
    console.log(req.body);
    const { name, price } = req.body;
    new Product({ name, price })
        .save()
        .then((product) => {
            console.log("Product added successfully");
            res.json(product);
        })
        .catch((err) => {
            console.log("Failed to add product: " + err);
            res.status(500).send("Failed to add product");
        });
});
// Get all products
router.get("/", (req, res) => {
    Product.find()
        .then((products) => {
            let responseHtml = "<h2>Products</h2>";
            responseHtml +=
                '<a href="/addProduct"><button>Add New Product</button></a><br/><br/>';
            responseHtml += "<ul>";
            products.forEach((product) => {
                responseHtml += `<li><a href="/updateProduct/${product._id}">${product.name}</a> - $${product.price}</li>`;
            });
            responseHtml += "</ul>";
            res.send(responseHtml);
        })
        .catch((err) => {
            console.log("Failed to find products: " + err);
            res.send("No products found");
        });
});
router.get("/getShop", (req, res) => {
    Product.find()
        .then((products) => {
            // Send back the list of products as JSON
            res.json(products);
        })
        .catch((err) => {
            console.log("Failed to find products: " + err);
            res.status(500).json({ message: "Failed to find products", error: err });
        });
});
// Get specific product by MongoDB's _id
router.get("/getSpecificProduct/:id", (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then((product) => {
            res.send("Specific Product: " + JSON.stringify(product));
        })
        .catch((err) => {
            console.log("Failed to find product: " + err);
            res.send("No product found");
        });
});
// Update specific product
router.get("/updateProduct/:id", (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then((product) => {
            if (!product) {
                return res.send("No product found with that ID");
            }
            let formHtml = `<h2>Update Product</h2>
                      <form action="/product/update/${product._id}" method="post">
                        Name: <input type="text" name="name" value="${product.name}"/><br />
                        Price: <input type="number" name="price" value="${product.price}"/><br />
                        <input type="submit" value="Update Product"/>
                      </form>
                      <br />
                      <form action="/product/delete/${product._id}" method="post">
                        <input type="submit" value="Delete Product" onclick="return confirm('Are you sure you want to delete this product?');"/>
                      </form>`;
            res.send(formHtml);
        })
        .catch((err) => {
            console.log("Failed to find product: " + err);
            res.status(500).send("Error fetching product");
        });
});
// Handle form data to update a product
router.post("/product/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    Product.findByIdAndUpdate(id, { name, price }, { new: true })
        .then((product) => {
            console.log("Product updated successfully");
            res.json(product);
            console.log(product);
        })
        .catch((err) => {
            console.log("Failed to update product: " + err);
            res.status(500).send("Failed to update product");
        });
});
// Delete specific product
router.post('/product/delete/:id', (req, res) => {
    const { id } = req.params;
    Product.findByIdAndRemove(id)
        .then(() => {
            console.log('Product deleted successfully');
            res.redirect('/');
        })
        .catch(err => {
            console.log('Failed to delete product: ' + err);
            res.status(500).send('Failed to delete product');
        });
});
module.exports = router;