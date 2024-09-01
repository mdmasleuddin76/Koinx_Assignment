// app.js

import rateLimit from "express-rate-limit";
import cors from "cors";

let requestCount = 0;
const maxRequests = 200; // Maximum number of requests before the server shuts down

export function setupMiddleware(app) {
  app.use(cors());

  // Rate limiter middleware to prevent abuse
  const limiter = rateLimit({
    windowMs: 5 * 1000, // 5 seconds
    max: 2, // Limit each IP to 2 requests per `windowMs`
    message: 'Too many requests from this IP, please try again later.'
  });

  app.use(limiter); // Apply rate limiter to all requests

  // Middleware to count requests and optionally shut down the server i wrote this function to limit the number of requests to the server because i dont want the server to be overloaded with requests because i dont have credit left on my cloud provider to handle the requests
  app.use((req, res, next) => {
    requestCount++;
    console.log(`Request #${requestCount}`);

    if (requestCount >= maxRequests) {
      console.log("Max requests reached, shutting down server...");
      // Close the server once the maxRequests limit is reached
      server.close(() => {
        console.log("Server closed.");
      });
    } else {
      next(); // Proceed to the next middleware/route handler
    }
  });
}
