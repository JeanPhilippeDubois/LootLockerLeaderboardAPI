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
 
app.listen(PORT, function(err){
  if (err) console.log("Error in server setup")
  console.log("Server listening on Port", PORT);
})

module.exports = app;