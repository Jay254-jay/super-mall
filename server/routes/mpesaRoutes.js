const express = require('express');
const axios = require('axios');
require('dotenv').config();
const router = express.Router();

// M-Pesa STK Push endpoint
router.post('/pay', async (req, res) => {
  const { phone, amount } = req.body;
  try {
    // 1. Get access token
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    const tokenRes = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const access_token = tokenRes.data.access_token;

    // 2. Prepare STK Push request
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');
    const stkPushPayload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: 'Order',
      TransactionDesc: 'Payment for order',
    };

    // 3. Make STK Push request
    const stkRes = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      stkPushPayload,
      { headers: { Authorization: `Bearer ${access_token}` } }
    );
    res.json(stkRes.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// M-Pesa callback endpoint
router.post('/callback', (req, res) => {
  // Handle payment confirmation here
  console.log('M-Pesa Callback:', req.body);
  res.json({ status: 'Received' });
});

module.exports = router;
