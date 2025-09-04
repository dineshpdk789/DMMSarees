const crypto = require('crypto');

// adjust this require if your utils/razorpay.js exports differently (e.g. { instance })
const instance = require('../utils/razorpay');

const processPayment = async (req, res, next) => {
  try {
    let { amount } = req.body;

    if (amount === undefined || amount === null) {
      return res.status(400).json({ success: false, message: 'Amount is required' });
    }

    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    // Razorpay expects integer amount in smallest currency unit (paise)
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    return res.status(200).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

const sendAPIKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_API_KEY });
};

const paymentVerification = async (req, res, next) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_API_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // payment verified — handle order creation / save to DB as needed
      return res.status(200).json({ success: true, reference: razorpay_payment_id });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { processPayment, sendAPIKey, paymentVerification };