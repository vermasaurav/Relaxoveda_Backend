const express = require("express");
const router = express.Router();

const Order = require("../models/order");

router.post("/", async (req, res) => {
  try {

    const order = await Order.create(req.body);

    res.status(201).json({
      success: true,
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});



router.put(
  "/:id/payment-success",
  async (req, res) => {

    try {

      const order =
        await Order.findByIdAndUpdate(

          req.params.id,

          {
            paymentStatus:
              "PAID",

            razorpayPaymentId:
              req.body
                .razorpayPaymentId,

            razorpayOrderId:
              req.body
                .razorpayOrderId,
          },

          {
            new: true,
          }
        );

      res.json({
        success: true,
        order,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
      });
    }
  }




  
);




router.put(
  "/:id/payment-failed",

  async (req, res) => {

    try {

      const order =
        await Order.findByIdAndUpdate(

          req.params.id,

          {
            paymentStatus:
              "FAILED",
          },

          {
            new: true,
          }
        );

      res.json({
        success: true,
        order,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
      });

    }
  }
);

module.exports = router;