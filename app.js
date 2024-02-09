require("dotenv").config("./.env");
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const https = require('https');
const http = require('http');

const fs = require('fs');

const apiRouter = require('./services/apiRouter');
 
const app = express();
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(apiRouter)
 
const httpServer = http.createServer(app);


const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/my_api_url/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/my_api_url/fullchain.pem'),
}, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});
 
module.exports = app;