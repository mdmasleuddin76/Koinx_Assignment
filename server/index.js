// index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { setupMiddleware } from "./app.js";
import { routes } from "./routes.js";
import { fetchEthPrice } from "./services/coingeckoService.js";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Set the port from environment or default to 3000

setupMiddleware(app); // Set up middleware and other configurations

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    fetchEthPrice(); // Fetch the initial ETH price upon successful MongoDB connection
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Define routes for the application
routes(app);

// Start the server and set an interval to fetch the ETH price every 10 minutes
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setInterval(fetchEthPrice, 10 * 60 * 1000); // Fetch ETH price every 10 minutes
});
