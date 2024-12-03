const express = require('express');
const redis = require('redis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

// connect to redis
const redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379'
});

(async () => {
    try {
      await redisClient.connect();
      console.log('Connected to Redis');
    } catch (err) {
      console.error('Failed to connect to Redis:', err);
      process.exit(1);
    }
})();

// sample in-memory data
const companies  = [
    { id: 1, name: 'Apple', industry: 'Technology', description: 'Tech giant' },
    { id: 2, name: 'Tesla', industry: 'Automotive', description: 'Electric cars' },
];

const stockPrices = [
    { id: 1, price: 200 },
    { id: 2, price: 600 }
];

// get stock api which mimics constantly changing stocks
app.get('/api/stocks', (req, res) => {
    const updatedPrices = stockPrices.map(stock => ({
        ...stock,
        price: (parseFloat(stock.price) + Math.random() * 10 - 5).toFixed(2), 
    }));
    res.json(updatedPrices);
});

// endpoint to cache company details using Redis
app.get('/api/companies/:id', async(req, res) => {
    const { id } = req.params;
    const redisKey = `company:${id}`;
    console.log('DM ==> redisKey: ', redisKey);
    try {
        // check Redis cache
        const cachedData = await redisClient.get(redisKey);

        if (cachedData) {
            return res.json(JSON.parse(cachedData));
        }

        // if no cache, fetch from "database"
        const company = companies.find((c) => c.id == id);
        if (company) {
            console.log('DM ==> Company found. Caching data.');
            await redisClient.setEx(redisKey, 3600, JSON.stringify(company));
            return res.json(company);
        }

        res.status(404).json({ error: 'Company not found' });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
 });

 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });