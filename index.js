const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');


// Create Express Server
const app = express();

// Configuration
const PORT = 3001;
const HOST = "localhost";
const API_SERVICE_URL = "https://api.yelp.com/v3/";


// Logging
app.use(morgan('dev'));
app.use(cors());

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });


 // Authorization
app.use('', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.sendStatus(403);
    }
 });


 // Proxy endpoints
app.use('/', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/`]: '',
    },
 }));

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });