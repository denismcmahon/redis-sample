const express = require('express');
const redis = require('redis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// connect to redis
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});

redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.log('Redis error: ' + err));

// sample in-memory data
const companies  = [
    { id: 1, name: 'Apple', industry: 'Technology', description: 'Tech giant' },
    { id: 2, name: 'Tesla', industry: 'Automotive', description: 'Electric cars' },
];

const stockPrices = [
    { id: 1, price: 200 },
    { id: 2, price: 600 }
];