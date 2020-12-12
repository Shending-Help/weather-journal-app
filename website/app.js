/* Global Variables */
const baseUrl = 'api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5eff5063dfc1d10eb8fd453b13548c61&units=imperial' ;
const apiUrl = "http://localhost:3000/";

// variables for elements to be used
const zipCodeEl = document.getElementById('zip');
const feelingsCodeEl = document.getElementById('feelings');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temp');
const contentEl = document.getElementById('content');

const catchErr = (error) => console.error('an Erorr occured ', error);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

const zipCode =  zipCodeEl.value;

function performAction(){
//  let url = baseUrl + zipCode + '&appid=' + apiKey ;

    
    //Post Data To Api For Get Zip Code Information
    getWeatherData(zipCode).then(zipInfo => {
        //Return And Show Alert If City Is Not Found
        if (zipInfo.cod != 200)
            return alert(zipInfo.message)

        //Now Post Data To Server For Saving And Display In Holder Section
        data.temp = zipInfo.list[0].main.temp;
        postDateToServer(data);
    }).catch(catchError);
}

async function getWeatherData(zipCode) {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()
}

/** Post Data To Server For Saving  */
async function postDateToServer(data) {
    let response = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        if (!response.ok) {
            alert('Process Not Successfuly');
            return;
        }
       
        response.json().then(data => {
            if (response.ok)
                updateUI();//Update UI Now
            else
                alert('Process Not Successfuly');
        }).catch(catchError);

    } catch (error) {
        catchError(error);
    }
}