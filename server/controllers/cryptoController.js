import { getTransactions } from "../services/etherscanService.js";
import {
  fetchEthPrice,
  getCurrentEthPrice,
} from "../services/coingeckoService.js";
import Transaction from "../models/Transaction.js";

// Controller function to fetch user transactions
export const fetchUserTransactions = async (req, res) => {
  const { address } = req.params;
  console.log(address);

  try {
    // Fetch transactions for the given address from the Etherscan service
    const transactions = await getTransactions(address);
    res.json(transactions); // Respond with the transactions in JSON format
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with an error message
  }
};

// Controller function to fetch and store the current Ethereum price
export const fetchAndStoreEthPrice = async (req, res) => {
  try {
    // Fetch the latest ETH price from the Coingecko service
    const price = await fetchEthPrice();
    res.json({ price }); // Respond with the current ETH price in JSON format
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with an error message
  }
};

// Controller function to calculate the user's total expenses in gas fees
export const getUserExpenses = async (req, res) => {
  const { address } = req.params;

  try {
    // Fetch transactions for the given address from the database
    const transactionsArray = await Transaction.find({ address });
    
    // Check if transactions are found in the database
    let transactions;
    if (!transactionsArray.length) {
      transactions = await getTransactions(address); // Fetch transactions if not found in the database
    }else{
      transactions = transactionsArray[0].transactions;
    }

    // Fetch the current ETH price from the Database
    const ethPrice = await getCurrentEthPrice();

    let totalExpenses = 0;

    // Calculate total gas expenses based on the gas used and gas price
    transactions.forEach((tx) => {
      const expense = (parseInt(tx.gasUsed) * parseInt(tx.gasPrice)) / 1e18; // Convert Wei to ETH
      totalExpenses += expense; // Accumulate total expenses
    });

    // Respond with the total expenses and the current ETH price
    res.json({ totalExpenses, currentEthPrice: ethPrice });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors and respond with an error message
  }
};
