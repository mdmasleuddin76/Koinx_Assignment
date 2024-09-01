import mongoose from "mongoose";

// Define the schema for individual transactions
const transactionSchema = new mongoose.Schema(
  {
    blockNumber: { type: String, required: true },
    blockHash: { type: String, required: true },
    timeStamp: { type: Date, required: true }, // Convert from Unix timestamp to Date
    hash: { type: String, required: true, unique: true }, // Unique identifier for the transaction
    nonce: { type: String, required: true },
    transactionIndex: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: false },
    value: { type: String, required: true }, // Amount in smallest denomination (Wei)
    gas: { type: String, required: true },
    gasPrice: { type: String, required: true },
    input: { type: String, required: true }, // Input data for the transaction
    methodId: { type: String }, // Optional field for method ID
    functionName: { type: String }, // Optional field for function name
    contractAddress: { type: String, default: null }, // Null if not a contract transaction
    cumulativeGasUsed: { type: String, required: true },
    txreceipt_status: { type: String, required: true }, // Transaction receipt status
    gasUsed: { type: String, required: true },
    confirmations: { type: String, required: true },
    isError: { type: String, required: true }, // Indicates if there was an error in the transaction
  },
  { _id: false }
); // Prevents automatic generation of _id for each sub-document

// Define the schema for a user's transactions, with transactions stored in an array
const userTransactionSchema = new mongoose.Schema(
  {
    address: { type: String, required: true, unique: true }, // User's Ethereum address
    transactions: [transactionSchema], // Array of transactions related to this address
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Create the model from the schema
const UserTransaction = mongoose.model(
  "UserTransaction",
  userTransactionSchema
);

export default UserTransaction;
