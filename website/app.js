/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '66bacb45ce516226ab7ebeae9950127c&units=imperial';

// Create a new date 
let d = new Date();
const optionsDate = {
  year: 'numeric', month: 'long', day: 'numeric'
};
const newDate = new Intl.DateTimeFormat('en-US', optionsDate).format(d);

/* Function called by event listener */
let processAction =(e)=> {
  const zipCode =  document.querySelector('#zip').value;
  const yourFeelings =  document.querySelector('#feelings').value;

  getWeather(baseURL, zipCode, apiKey)
  .then((data)=>{
    // Add data
    return postData('/add', {date:newDate, temp: data.main.temp, content:yourFeelings} );
  })
  .then(
    ()=>{
      updateUI()
    }
  )
}

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all');

  try{
  // Transform into JSON
  const allData = await request.json();
  // Write updated data to DOM elements
  document.querySelector('#date').innerHTML = `Date: ${allData.Date}`;
  document.querySelector('#temp').innerHTML = `Temperature: ${allData.Temp}` ;
  document.querySelector('#content').innerHTML = `I am feeling: ${allData.Content}`;
  document.querySelector('#zip').value = "";
  document.querySelector('#feelings').value = "";
  }catch(error){
    console.log("error", error);
    // appropriately handle the error
  }
}

const getWeather = async (baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL+zipCode+'&appid='+apiKey);
    try{
      const data = await response.json();
      return data;  
    } catch(error){
      console.log("error", error);
    }
}

const postData = async (url = "", data = {})=>{
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data)
    });

    try {
      const newData = await response.json();
      return newData;
    } catch(error) {
      console.log("error", error);
    }
}

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', processAction);