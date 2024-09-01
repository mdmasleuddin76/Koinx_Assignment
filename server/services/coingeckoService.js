import axios from 'axios';
import EthPrice from '../models/EthPrice.js';

// Function to fetch the current Ethereum price from the Coingecko API and store it in the database
export const fetchEthPrice = async () => {
    console.log("fetchAndStoreEthPrice"); // Log for debugging purposes
    try {
        // Send a GET request to the Coingecko API to get the price of Ethereum in INR
        const response = await axios.get(`${process.env.COINGECKO_BASE_URL}?ids=ethereum&vs_currencies=inr`);
        
        // Extract the price of Ethereum in INR from the API response
        const price = response.data.ethereum.inr;
        
        // Create a new EthPrice document with the fetched price
        const ethPrice = new EthPrice({ price });
        
        // Save the new price document in the database
        await ethPrice.save();
        
        // Return the fetched price
        return price;
    } catch (error) {
        console.error('Error fetching Ethereum price:', error); // Log the error for debugging
        throw new Error('Could not fetch Ethereum price'); // Throw an error if the API request fails
    }
};

// Function to retrieve the most recent Ethereum price stored in the database
export const getCurrentEthPrice = async () => {
    try {
        // Find the most recent EthPrice document by sorting by timestamp in descending order
        const latestPrice = await EthPrice.findOne().sort({ timestamp: -1 });
        
        // Return the price if found, otherwise return null
        return latestPrice ? latestPrice.price : null;
    } catch (error) {
        console.error('Error getting current Ethereum price:', error); // Log the error for debugging
        throw new Error('Could not get current Ethereum price'); // Throw an error if the database query fails
    }
};
