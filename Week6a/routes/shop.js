const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Schema = mongoose.Schema;

// Setup multer for handling file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/'); // Ensure this folder exists in your project structure
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Define the product schema
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false }, // Path to the image
    anArray: { type: Array, required: false },
    anObject: { type: Object, required: false },
    username: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

// Routes
router.get("/addProduct", (req, res) => {
    res.send(
        '<form action="/product/add" method="post" enctype="multipart/form-data">' +
        'Name: <input type="text" name="name" /><br />' +
        'Price: <input type="number" name="price" /><br />' +
        'Image: <input type="file" name="image" /><br />' +
        '<input type="submit" value="Add Product" />' +
        '</form>'
    );
});

router.post("/product/add", upload.single('image'), (req, res) => {
    const { name, price, username } = req.body; // Include username here
    const imagePath = req.file ? req.file.path : '';
    new Product({ name, price, image: imagePath, username }) // Include username in the new product
        .save()
        .then(product => {
            console.log("Product added successfully");
            res.json(product);
        })
        .catch(err => {
            console.log("Failed to add product: " + err);
            res.status(500).send("Failed to add product");
        });
});

router.get("/userProducts/:username", (req, res) => {
    const { username } = req.params;
    console.log("Fetching products for username:", username); // Debugging line
    Product.find({ username }) // Find products by username
        .then(products => {
            console.log("Products found:", products); // Debugging line
            res.json(products);
        })
        .catch(err => {
            console.log("Failed to find user products: " + err);
            res.status(500).send("Failed to find user products");
        });
});


router.get("/", (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products); // Sending back JSON list of products
        })
        .catch((err) => {
            console.log("Failed to find products: " + err);
            res.status(500).send("Failed to find products");
        });
});

router.get("/getShop", (req, res) => {
    Product.find()
        .then((products) => {
            res.json(products); // Sending back the list of products as JSON
        })
        .catch((err) => {
            console.log("Failed to find products: " + err);
            res.status(500).json({ message: "Failed to find products", error: err });
        });
});

router.get("/getSpecificProduct/:id", (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then((product) => {
            res.json(product); // Sending back the specific product as JSON
        })
        .catch((err) => {
            console.log("Failed to find product: " + err);
            res.status(500).send("No product found");
        });
});

router.post("/product/update/:id", upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const update = { name, price };
    if (req.file) update.image = req.file.path; // Update image path if new image uploaded

    Product.findByIdAndUpdate(id, update, { new: true })
        .then((product) => {
            res.json(product); // Sending back the updated product as JSON
        })
        .catch((err) => {
            console.log("Failed to update product: " + err);
            res.status(500).send("Failed to update product");
        });
});

router.post('/product/delete/:id', (req, res) => {
    const { id } = req.params;
    Product.findByIdAndRemove(id)
        .then(() => {
            res.send('Product deleted successfully');
        })
        .catch(err => {
            console.log('Failed to delete product: ' + err);
            res.status(500).send('Failed to delete product');
        });
});

module.exports = router;
