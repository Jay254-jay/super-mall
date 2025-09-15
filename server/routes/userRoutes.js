
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");

// Admin user management routes
router.get("/", userController.getAllUsers); // GET /api/users
router.put("/:id", userController.updateUser); // PUT /api/users/:id
router.delete("/:id", userController.deleteUser); // DELETE /api/users/:id

// Route for user registration
router.post("/register", userController.register);

// Route for user login
router.post("/login", userController.login);

module.exports = router;
