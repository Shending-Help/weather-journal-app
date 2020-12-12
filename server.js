// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')



//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

app.listen(port, listening);

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

app.get('/getAll', (req, res) => {
    res.send(projectData).status(200).end();
})
app.post('/postData', addWeather );

function addWeather (req){
    let data = req.body
    
    projectData.push({
        temp : data.temp ,
        date : data.date , 
        feeling : data.feeling

    });
    res.send(projectData).status(404).end();
}
