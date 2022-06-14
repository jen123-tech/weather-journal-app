// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const server = app.listen(port, ()=>{
    console.log(`Server running on localhost on port: ${port}`);
});

// GET route
let sendData = (req, res)=> {
    res.send(projectData);
};
app.get('/all', sendData);

// POST route
let getData = (req, res)=> {
    projectData.Date = req.body.date;
    projectData.Temp = req.body.temp;
    projectData.Content = req.body.content;
    res.send(projectData);
};
app.post('/add', getData);

