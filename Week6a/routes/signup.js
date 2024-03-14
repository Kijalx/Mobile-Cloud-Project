const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

// Signup page with form
router.get("/signup", (req, res) => {
    res.send(
        '<form action="/user/signup" method="post">' +
        'Username: <input type="text" name="username" /><br />' +
        'Password: <input type="password" name="password" /><br />' +
        '<input type="submit" value="Sign Up" />' +
        "</form>"
    );
});

// Handle form data to create a new user
router.post("/user/signup", async (req, res) => {
    console.log(req.body);
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.json(user); // Redirect to login page after successful signup
    } catch (error) {
        console.log("Failed to sign up user: " + error);
        
        res.status(500).send("Failed to sign up");
    }
});

router.get("/getUsers", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Admin panel to change user roles
router.get("/admin", async (req, res) => {
    try {
        const users = await User.find();
        let responseHtml = "<h2>Users</h2>";
        responseHtml += "<ul>";
        users.forEach((user) => {
            responseHtml += `<li>${user.username} - Admin: ${user.isAdmin ? "Yes" : "No"
                } - <button onclick="changeUserRole('${user._id}', '${user.isAdmin ? 'user' : 'admin'}')">Change Role</button></li>`;
        });
        responseHtml += "</ul>";
        responseHtml += "<script>function changeUserRole(userId, currentRole) {fetch(`/changeRole/${userId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: currentRole }) }).then(response => { if (!response.ok) { throw new Error('Failed to change user role'); } window.location.reload(); }).catch(error => console.error('Error:', error));}</script>";
        res.send(responseHtml);
    } catch (error) {
        console.log("Failed to find users: " + error);
        res.status(500).send("Failed to load admin page");
    }
});


// Get specific user for role change
router.put("/changeRole/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send("No user found with that ID");
        }
        // Change user role and respond with success message
        user.isAdmin = !user.isAdmin; // Toggle admin status
        await user.save();
        res.status(200).send("User role changed successfully");
    } catch (error) {
        console.log("Failed to change user role: " + error);
        res.status(500).send("Failed to change user role");
    }
});


router.get("/login", (req, res) => {
    res.send(
        '<form action="/user/login" method="post">' +
        'Username: <input type="text" name="username" /><br />' +
        'Password: <input type="password" name="password" /><br />' +
        '<input type="submit" value="Login" />' +
        "</form>"
    );
});

router.post("/user/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            // User not found
            return res.status(401).send("Incorrect username or password.");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Password does not match
            return res.status(401).send("Incorrect username or password.");
        }
        // Authentication successful
        res.json({ username: user.username, isAdmin: user.isAdmin }); // Send user info including isAdmin status
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send("An error occurred during login.");
    }
});

// Export the router to use in your app.js
module.exports = router;

