import axios from "axios";
import Transaction from "../models/Transaction.js";

// Function to fetch transactions for a specific Ethereum address
export const getTransactions = async (address) => {
  try {
    // Send a GET request to the Etherscan API to retrieve the transaction list for the provided address
    const response = await axios.get(`${process.env.ETHERSCAN_BASE_URL}`, {
      params: {
        module: "account", // Specifies the module to query (account-related data)
        action: "txlist", // Specifies the action to perform (retrieve transaction list)
        address, // Ethereum address to query transactions for
        startblock: 0, // Starting block number (0 to include all transactions)
        endblock: 99999999, // Ending block number (high value to include all transactions)
        sort: "asc", // Sort transactions in ascending order
        apikey: process.env.ETHERSCAN_API_KEY, // API key for authenticating the request
      },
    });

    // Extract the transaction data from the response
    let transactions = response.data.result;
    console.log(transactions.length); // Log the total number of transactions retrieved

    // Limit the transactions to the first 50 (for demonstration purposes)
    if (transactions.length > 50) transactions = transactions.slice(0, 50);

    // Find the document for the given address in the database
    let userTransaction = await Transaction.findOne({ address });

    if (!userTransaction) {
      // If no document exists for the address, create a new one
      userTransaction = new Transaction({ address, transactions });
    } else {
      // If document exists, push the new transactions into the existing array
      userTransaction.transactions.push(...transactions);
    }

    // Save the updated or newly created document to the database
    await userTransaction.save();

    // Return the fetched transactions
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error); // Log the error for debugging
    throw new Error("Could not fetch transactions"); // Throw an error if the API request fails
  }
};
