require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const shoeRoutes = require('./routes/shoes');

// This middleware allows us to serve static files from a folder.
// The folder name will *not* be part of the request path.
app.use(express.static('./public'));

// This middleware implements Cross Origin Resource Sharing (CORS) using a third party library
app.use(cors());

// parses incoming requests with JSON payloads
app.use(express.json());

// To use routing, we define the endpoint using middleware syntax.
// The first paramater is the path, and the second is the router module.
// Your routes will be available at this path slash whatever your router endpoints are.
app.use('/api/v1/shoes', shoeRoutes);

const SERVER_PORT = process.env.PORT || 8080;

// Start up the app
app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`);
});
