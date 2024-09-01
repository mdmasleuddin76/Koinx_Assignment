import React, { useState, useEffect } from "react";
import { fetchUserExpenses } from "../api";

const UserExpensesPage = () => {
  const [address, setAddress] = useState("");
  const [expenses, setExpenses] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadExpenses = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!address) throw new Error("Please enter an Ethereum address.");
      const data = await fetchUserExpenses(address);
      setExpenses(data.totalExpenses);
      setEthPrice(data.currentEthPrice);
    } catch (err) {
      console.log(err)
      setError("Failed to fetch user expenses.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[50%] mx-auto text-xl">
      <h1 className="m-2 p-2 font-semibold text-center text-2xl">User Expenses</h1>
      <input
        className="border-2 bg-slate-200 border-gray-300 p-2 w-[50%] rounded-lg"
        type="text"
        placeholder="Enter Ethereum Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={loadExpenses}  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mx-2">Fetch Expenses</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {expenses !== null && ethPrice !== null && (
        <div className="m-5 font-semibold">
          <h2 className="text-xl">Total Expenses: {expenses} ETH</h2>
          <h2>Current ETH Price: ₹{ethPrice}</h2>
        </div>
      )}
    </div>
  );
};

export default UserExpensesPage;
