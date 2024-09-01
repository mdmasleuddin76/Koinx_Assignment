import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TransactionsPage from "./components/TransactionsPage";
import EthPricePage from "./components/EthPricePage";
import UserExpensesPage from "./components/UserExpensesPage";

const App = () => {
  return (
    <Router>
      <div className=" bg-gray-400 min-h-screen w-full">
        <nav className="flex justify-center gap-5 cursor-pointer text-black text-2xl font-semibold">
          <Link to="/">Home</Link> |{" "}
          <Link to="/transactions">Transactions</Link> |{" "}
          <Link to="/eth-price">ETH Price</Link> |{" "}
          <Link to="/user-expenses">User Expenses</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-4xl font-semibold text-center my-5">
                Welcome to Ethereum Tracker! <br />
                Please navigate to any page using the navbar to perform
                operations.
              </h1>
            }
          />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/eth-price" element={<EthPricePage />} />
          <Route path="/user-expenses" element={<UserExpensesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
