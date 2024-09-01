import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust if needed

// Fetch transactions with pagination
export const fetchUserTransactions = async (address) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/transactions/${address}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};

// Fetch current Ethereum price
export const fetchEthPrice = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/eth-price`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Ethereum price:', error);
        throw error;
    }
};

// Fetch user expenses
export const fetchUserExpenses = async (address) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/user-expenses/${address}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user expenses:', error);
        throw error;
    }
};
