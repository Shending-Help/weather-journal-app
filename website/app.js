

/* Global Variables */
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5eff5063dfc1d10eb8fd453b13548c61&units=imperial' ;
const apiUrl = "http://localhost:3000/";
// variables for elements to be used
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const zipCodeEl = document.getElementById('zip');
const feelingsCodeEl = document.getElementById('feelings');
const contentEl = document.getElementById('content');



// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);


async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
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
        if (!response.ok) {
            alert('something went wrong');
            return;
        }
       
        response.json().then(data => {
            if (response.ok)
              updateUI();//Update UI Now
            else
                alert('something went wrong');
        }).catch((error) => console.error('Some Error Has Been caught => ', error));

    } catch (error) {
        console.error('err is ',error);
    }
  }


function performAction(){

    const zipCode =  zipCodeEl.value;
    const feelings = feelingsCodeEl.value;

    getWeatherData(zipCode)
    .then( dataFromApi => {

        let date = new Date(dataFromApi.dt * 1000);
        let date_str = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        postData('http://localhost:3000/postData', {temp: dataFromApi.main.temp, date: date_str, feeling: feelings});
        
    })
}

const getWeatherData = async (zipCode) => {
    const response  = await fetch(baseUrl + zipCode + apiKey );
    
    try {
        const data = await response.json();
        console.log(data)
        return data;
    } catch(error) {
        console.error('error', error);
    };
};

async function updateUI() {
    let response = await fetch(`${apiUrl}getAll`);
    try {
        response.json().then(data => {
            dateEl.innerHTML = `Date Is: ${data.date}`;
            tempEl.innerHTML = `Temp Is: ${data.temp}`;
            contentEl.innerHTML = `My Feelings Is: ${data.feeling}`;
        }).catch((error) => console.error('Some Error Has Been caught => ', error));
    } catch (error) {
        console.error('error', error);
    }
}