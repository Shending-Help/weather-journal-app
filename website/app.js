// Personal API Key for OpenWeatherMap API
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=5eff5063dfc1d10eb8fd453b13548c61&units=imperial' ;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(){  
    const zip = document.getElementById('zip').value;  
    getApiData(zip);
}

/* Function to GET Web API Data*/
const getApiData = async (zipCode) => {
    res = await fetch(baseUrl + zipCode + apiKey);
    try{
        const data = await res.json();
        console.log(res);
    }
    catch (err) {

        console.error('an error happened' , err);
    }
}
/* Function to POST data */


/* Function to GET Project Data */