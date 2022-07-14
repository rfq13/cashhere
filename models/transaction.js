const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    item: {
      type: String,
      required: true,
      ref: "Items",
    },
    company: {
      type: String,
      required: true,
      ref: "Companies",
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transactions", schema);
