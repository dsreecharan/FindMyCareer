const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const Career = require('../models/career.model');

// Get all careers
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific career by ID
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new career (admin only)
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, async (req, res) => {
  const career = new Career(req.body);
  try {
    const newCareer = await career.save();
    res.status(201).json(newCareer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a career (admin only)
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    Object.assign(career, req.body);
    const updatedCareer = await career.save();
    res.json(updatedCareer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a career (admin only)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    await career.remove();
    res.json({ message: 'Career deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 