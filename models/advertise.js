const mongoose = require("mongoose");

const advertiseSchema = new mongoose.Schema({

  image: {
    type: String,
    required: true,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model(
  "Advertise",
  advertiseSchema
);