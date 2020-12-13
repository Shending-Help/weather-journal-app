

/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5eff5063dfc1d10eb8fd453b13548c61&units=imperial' ;
const apiUrl = 'http://localhost:3000/';
// variables for elements to be used
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const zipCodeEl = document.getElementById('zip');
const feelingsCodeEl = document.getElementById('feelings');
const contentEl = document.getElementById('content');



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// performsaction when clicking the generate element
document.getElementById('generate').addEventListener('click', performAction);

// POST route that validates the response then updates the ui
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const res = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    try {
        if (!res.ok) {
            alert('something went wrong');
            return;
        }
       
        res.json()
        .then(data => {
            if (res.ok)
                // updates the ui
                updateUI();
            else
                alert('something went wrong');
        })
        .catch((error) => console.error('Some Error Has Been caught => ', error));

    } catch (error) {
        console.error('err is ',error);
    }
  }

// happens when generate is clicked it stores the two input values in two constsants 
// and calls the getWeatherData if resolved it posts the data to the server 
function performAction(){

    const zipCode =  zipCodeEl.value;
    const feelings = feelingsCodeEl.value;

    getWeatherData(zipCode)
    .then( dataFromApi => {
        // getting the current date 
        let d = new Date(dataFromApi.dt * 1000);
        let d_str = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
        postData('http://localhost:3000/postData', {temp: dataFromApi.main.temp, date: d_str, feeling: feelings});
        
    })
}

// this functions gets the data from the api and also validates them printing an the error on the go 
const getWeatherData = async (zipCode) => {
    const response  = await fetch(baseUrl + zipCode + apiKey );
    
    try {
        const data = await response.json();
        console.log(data)
        return data;
    } 
    catch(err) {
        console.error('error', err);
    };
};

// this function updates the most recent entry element
async function updateUI() {
    let res = await fetch(`${apiUrl}getAll`);
    try {
        res.json()
        .then(data => {
            dateEl.innerHTML = `Date Is: ${data.date}`;            
            contentEl.innerHTML = `My Feelings Is: ${data.feeling}`;           
            tempEl.innerHTML = `Temp Is: ${data.temp}`;
            
        })
        .catch((error) => console.error('Some Error Has Been caught => ', error));
    } 
    catch (error) {
        console.error('error', error);
    }
}