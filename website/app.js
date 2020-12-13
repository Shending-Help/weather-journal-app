// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5eff5063dfc1d10eb8fd453b13548c61&units=imperial' ;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(){  
    const zip = document.getElementById('zip').value; 
    const feeling = document.getElementById('feelings').value; 
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    getApiData(zip)
    .then(
        data => {
            console.log(data);
        
        // add data to post request
        postData('/postData', { temp : data.main.temp , date : newDate, feeling : feeling });
    });
}

/* Function to GET Web API Data*/
const getApiData = async (zipCode) => {
    res = await fetch(baseUrl + zipCode + apiKey);
    try{
        const data = await res.json();
        console.log(res);
        return data;
    }
    catch (err) {

        console.error('an error happened' , err);
    }
}

/* Function to POST data */
// Example POST method implementation:

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    try {
        
        response.json(); // parses JSON response into native JavaScript objects
        makeChangesVisible();
    }
    catch(err){
        
        console.error('error',err);
    }
}

/* Function to GET Project Data */
const makeChangesVisible = async () => {
    const request = await fetch('/getData');
    try{
      const allData = await request.json();
      
      document.getElementById('temp').innerHTML = allData.temp;
      document.getElementById('date').innerHTML = allData.date;
      document.getElementById('content').innerHTML = allData.feeling;
  
    }catch(error){
      console.error("error", error);
    }
}