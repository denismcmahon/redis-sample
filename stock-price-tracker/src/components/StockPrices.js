import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockPrices = ({ onSelectCompany }) => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/stocks');
                console.log('DM ==> response.data: ', response.data);
                setStocks(response.data);         
            } catch (error) {
                console.error('Error fetching stock prices: ',  error);
            }
        };

        fetchStocks();
        const interval = setInterval(fetchStocks, 5000); // refresh every 5 seconds
        return () => clearInterval(interval); // clean up interval on unmount
    }, []);

    return (
        <div>
            <h2>Stock Prices</h2>
            <ul>
                {stocks.map((stock) => (
                    <li key={stock.id}>
                        Company ID: {stock.id} - Price: ${stock.price}
                        <button onClick={() => onSelectCompany(stock.id)}>View Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StockPrices;