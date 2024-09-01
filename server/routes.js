// routes.js

import {
    fetchUserTransactions,
    fetchAndStoreEthPrice,
    getUserExpenses,
  } from "./controllers/cryptoController.js";
  
  export function routes(app) {
    app.get("/api/transactions/:address", fetchUserTransactions); // Route to fetch transactions for a given address
    app.get("/api/eth-price", fetchAndStoreEthPrice); // Route to fetch and store the current ETH price
    app.get("/api/user-expenses/:address", getUserExpenses); // Route to get user expenses based on transactions
  }
  