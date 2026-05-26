const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpay");

router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});






router.post(
  "/verify",
  async (req, res) => {

    const crypto =
      require("crypto");

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generated =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
            "|" +
            razorpay_payment_id
        )
        .digest("hex");

    if (
      generated ===
      razorpay_signature
    ) {

      return res.json({
        success: true,
      });
    }

    res.status(400).json({
      success: false,
    });
  }
);

module.exports = router;