// Get all users (admin)
exports.getAllUsers = (req, res) => {
    userModel.getAllUsers()
        .then(users => res.json(users))
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching users.");
        });
};

// Update user (admin)
exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    userModel.updateUser(userId, userData)
        .then(result => res.json({ message: "User updated successfully." }))
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error updating user.");
        });
};

// Delete user (admin)
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    userModel.deleteUser(userId)
        .then(result => res.json({ message: "User deleted successfully." }))
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error deleting user.");
        });
};
// userController.js

const userModel = require("../models/userModel");

exports.register = (req, res) => {
    const { email, password, isAdmin, fname, lname } = req.body;
    userModel.register(email, password, isAdmin, fname, lname)
        .then(result => {
            console.log("Successful Register");
            res.send({ success: true, result });
        })
        .catch(err => {
            console.error(err.message);
            if (err.message === "User already exists") {
                res.status(400).send({ error: "Email is already registered." });
            } else {
                res.status(500).send({ error: "Error registering user." });
            }
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    userModel.login(email, password)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error logging in.");
        });
};
