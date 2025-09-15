import express from 'express';
import {
  createPayPalOrder,
  capturePayPalOrder,
} from '../controllers/paypalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get PayPal client ID
// @route   GET /api/paypal/config
// @access  Private
router.get('/config', protect, (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// @desc    Create a new PayPal order
// @route   POST /api/paypal/orders
// @access  Public (for now, can be protected later)
router.post('/create-order', createPayPalOrder);

// @desc    Capture a PayPal order
// @route   POST /api/paypal/orders/:orderID/capture
// @access  Private
router.post('/:orderID/capture', protect, capturePayPalOrder);

export default router;
