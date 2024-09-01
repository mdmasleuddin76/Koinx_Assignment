import React, { useState, useEffect } from "react";
import { fetchUserTransactions } from "../api";

const TransactionsPage = () => {
  const [address, setAddress] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTransactions = async () => {
    if (address) {
      console.log("Fetching transactions for address:", address);
      setLoading(true);
      setError(null);
      try {
        const transactions = await fetchUserTransactions(address);
        setTransactions(transactions);
      } catch (err) {
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="w-[50%] mx-auto text-xl">
      <h1 className="m-2 p-2 font-semibold text-center text-2xl">Fetch Ethereum Transactions</h1>
      <input
        className="border-2 bg-slate-200 border-gray-300 p-2 w-[50%] rounded-lg"
        type="text"
        placeholder="Enter Ethereum Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button 
  onClick={loadTransactions} 
  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mx-2"
>
  Fetch Transactions
</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading&&transactions.length === 0 && <p className="m-3 font-semibold">No transactions found.</p>}
      {transactions.length > 0 && (
        <div className="p-4 max-w-3xl mx-auto bg-slate-300 w-[100%] my-5 overflow-hidden shadow-md rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Transaction Details</h2>
          <ul className="space-y-4">
            <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="text-lg truncate font-semibold">
                <strong>Block Hash:</strong> {transactions[page].blockHash}
              </p>
              <p className="text-lg truncate font-semibold">
                <strong>Block Number:</strong> {transactions[page].blockNumber}
              </p>
              <p className="text-lg font-semibold">
                <strong>Confirmations:</strong>{" "}
                {transactions[page].confirmations}
              </p>
              <p className="text-lg truncate  font-semibold">
                <strong>Contract Address:</strong>{" "}
                {transactions[page].contractAddress || "N/A"}
              </p>
              <p className="text-lg truncate  font-semibold">
                <strong>Cumulative Gas Used:</strong>{" "}
                {transactions[page].cumulativeGasUsed}
              </p>
              <p className="text-lg truncate  font-semibold">
                <strong>From:</strong> {transactions[page].from}
              </p>
              <p className="text-lg truncate  font-semibold">
                <strong>Function Name:</strong>{" "}
                {transactions[page].functionName || "N/A"}
              </p>
              <p className="text-lg font-semibold">
                <strong>Gas:</strong> {transactions[page].gas}
              </p>
              <p className="text-lg font-semibold">
                <strong>Gas Price:</strong> {transactions[page].gasPrice}
              </p>
              <p className="text-lg font-semibold">
                <strong>Gas Used:</strong> {transactions[page].gasUsed}
              </p>
              <p className="text-lg  truncate  font-semibold">
                <strong>Hash:</strong> {transactions[page].hash}
              </p>
              <p className="text-lg truncate font-semibold">
                <strong>Input:</strong> {transactions[page].input}
              </p>
              <p className="text-lg font-semibold">
                <strong>Method ID:</strong>{" "}
                {transactions[page].methodId || "N/A"}
              </p>
              <p className="text-lg font-semibold">
                <strong>Nonce:</strong> {transactions[page].nonce}
              </p>
              <p className="text-lg font-semibold">
                <strong>Timestamp:</strong>{" "}
                {new Date(transactions[page].timeStamp * 1000).toLocaleString()}
              </p>
              <p className="text-lg font-semibold">
                <strong>To:</strong> {transactions[page].to || "N/A"}
              </p>
              <p className="text-lg font-semibold">
                <strong>Transaction Index:</strong>{" "}
                {transactions[page].transactionIndex}
              </p>
              <p className="text-lg font-semibold">
                <strong>Receipt Status:</strong>{" "}
                {transactions[page].txreceipt_status}
              </p>
              <p className="text-lg font-semibold">
                <strong>Error Status:</strong> {transactions[page].isError}
              </p>
            </li>
          </ul>
        </div>
      )}
      <div>
        <button disabled={page <= 0} onClick={() => setPage(page - 1)}  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mx-2">
          Previous
        </button>
        <span className=" bg-slate-300 border-black border rounded-md p-2">
          {" "}
          Page {page + 1}
          {"..."}
        </span>
        <button
          disabled={page >= transactions.length - 1}
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionsPage;
