const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: String,

    phone: String,

    address: String,

    products: [
      {
        productId: String,
        name: String,
        price: Number,
        qty: Number,
      },
    ],

    totalAmount: Number,

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
    },

    paymentStatus: {
      type: String,
      enum: [
        "PENDING",
        "PAID",
        "FAILED",
      ],
      default: "PENDING",
    },

    razorpayOrderId: String,

    razorpayPaymentId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Order",
  orderSchema
);