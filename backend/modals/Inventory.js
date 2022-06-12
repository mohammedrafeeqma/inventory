const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("inventory", inventorySchema);
