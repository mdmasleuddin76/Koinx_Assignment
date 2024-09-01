import mongoose from "mongoose";

const ethPriceSchema = new mongoose.Schema({
  // The price of Ethereum (ETH) at the recorded timestamp
  price: {
    type: Number,
    required: true,
  },

  // The timestamp when the price was recorded; defaults to the current date and time
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create a TTL (Time-To-Live) index on the `timestamp` field to automatically delete documents 600 seconds (10 minutes) after creation

ethPriceSchema.index({ timestamp: 1 }, { expireAfterSeconds: 600 });

// The model responsible for interacting with the EthPrice collection in MongoDB
const EthPrice = mongoose.model("EthPrice", ethPriceSchema);

export default EthPrice;
