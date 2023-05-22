function formatDate(){
  let date=new Date();
  let hours=date.getHours();
  if (hours<10) {hours=`0 ${hours}`
    
  };
  let minute=date.getMinutes();
  if (minute<10) {minute=`0 ${minute}`
    
  }
  let days=["SUN","MON","TUE","WED","THU","FRI","SAT"];
  let weekday=days[date.getDay()];

  return `${weekday} ${hours}:${minute}`;
}


function showForecast(response){
  console.log(response.data.daily);
  let forecast=response.data.daily;

  let weatherForecast=document.querySelector("#forecast");
  let forecastHTML=`<div class="row">`
  forecast.forEach(function (forecastTemperature){
forecastHTML=forecastHTML + `
        <div class="col-2">
          ${forecastTemperature.day}
          
          <img
            src="https://openweathermap.org/img/wn/@2x.png">
            
             <span class="forecast-temp-max">${Math.round(forecastTemperature.maximun)}°</span>
              <span class="forecast-temp-min">${Math.round(forecastTemperature.minimum)}°</span>
        </div>
      `;});
forecastHTML=forecastHTML + `</div>`;

weatherForecast.innerHTML=forecastHTML};

function getCoord(coordinates){
  let apiKey= "d8051fat3o41a5f56ed7b9b9ed32a234";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}



function displayTemp(response){ 
  celsiusTempValue=response.data.temperature.current;
  let cityTemp=Math.round(response.data.temperature.current);
  let mainTemp=document.querySelector(".Temp-value");
  mainTemp.innerHTML=cityTemp;

  let cityName=document.querySelector("h1");
  cityName.innerHTML=response.data.city;
  
  let weatherDescription=document.querySelector("#Description");
  weatherDescription.innerHTML=(response.data.condition.description);

  let cityHumidity=document.querySelector("#Humidity");
  cityHumidity.innerHTML=Math.round(response.data.temperature.humidity);

  let cityWind=document.querySelector("#Wind");
  cityWind.innerHTML=Math.round(response.data.wind.speed);

  let date =document.querySelector("#Date");
  date.innerHTML=formatDate(response.data.dt*1000);

  let icon=document.querySelector("#icon");
  icon.setAttribute("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  
  getCoord(response.data.coordinates);}


function search(city){
  let apiKey= "d8051fat3o41a5f56ed7b9b9ed32a234";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);

}



function controlSearch(event){
  event.preventDefault();
  let inputCityName=document.querySelector("#search-city")
  search(inputCityName.value);
}

function showFahrenTemp(event){
  event.preventDefault();
  celsiusLink.classList.remove("Active");
  fahrenLink.classList.add("Active")
    let showValue=document.querySelector(".Temp-value");
  let fahrenValue=(celsiusTempValue * 9)/5 + 32;
  showValue.innerHTML=Math.round(fahrenValue);
}

function celsiusTemp(event){
  event.preventDefault();
  celsiusLink.classList.add("Active");
  fahrenLink.classList.remove("Active");
     let showValue=document.querySelector(".Temp-value");
  showValue.innerHTML=Math.round(celsiusTempValue);
 
}

let celsiusTempValue= null;
 
let searchFrom=document.querySelector("#search-form");
searchFrom.addEventListener("submit",controlSearch);

let fahrenLink=document.querySelector("#Fahren");
fahrenLink.addEventListener("click",showFahrenTemp);

let celsiusLink=document.querySelector("#Cel");
celsiusLink.addEventListener("click",celsiusTemp);
showForecast();