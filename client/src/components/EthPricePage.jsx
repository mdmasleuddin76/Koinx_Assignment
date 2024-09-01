import React, { useState, useEffect } from 'react';
import { fetchEthPrice } from '../api';

const EthPricePage = () => {
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPrice = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchEthPrice();
                setPrice(data.price);
                console.log("data : ",data);    
            } catch (err) {
                console.error("error response sattus : ",err);
                if (err.response && err.response.status === 429) {
                    // Handle rate limit error
                    setError('Too many requests from this IP, please try again later. Wait for 5 seconds and refresh the page.');
                  } else {
                    // Handle other errors
                    setError('Failed to fetch Ethereum price. Please try again later.');
                  }
            } finally {

                setLoading(false);
            }
        };
        loadPrice();
    }, []);

    return (
        <div className='text-center text-xl m-5 font-semibold'>
            <h1>Current Ethereum Price</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!error&&price !== null && <h2>Current ETH Price: ₹{price}</h2>}
        </div>
    );
};

export default EthPricePage;
