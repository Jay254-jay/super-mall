const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
// ...existing code...
const categoryRoutes = require('./routes/category');
app.use('/api/categories', categoryRoutes);
// ...existing code...
// ...existing code...

// Seed initial categories (run once, then remove or comment out)
router.post('/seed', async (req, res) => {
  const initialCategories = [
    { name: "Kids Clothes", description: "Clothing for children" },
    { name: "Sports&Outdoors", description: "Sports and outdoor activities" },
    { name: "Toys & Game", description: "Toys and games for kids" },
    { name: "Other sports", description: "Other sports equipment" },
    { name: "Cycling", description: "Cycling gear and accessories" },
    { name: "Camping & Hiking", description: "Camping and hiking equipment" },
    { name: "Fitness", description: "Fitness gear and accessories" }
  ];
  try {
    await Category.insertMany(initialCategories);
    res.status(201).json({ message: "Categories seeded!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ...existing code...

// Create category (admin only)
router.post('/', async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all categories (for customer and admin)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;