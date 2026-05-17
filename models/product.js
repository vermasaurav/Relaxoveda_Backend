const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  shortDesc: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  oldPrice: {
    type: Number,
  },

  image: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Product",
  productSchema
);