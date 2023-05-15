
function displayTemp(response){
  let cityTemp=Math.round(response.data.main.temp);
  let mainTemp=document.querySelector(".Temp-value");
  mainTemp.innerHTML=cityTemp;

  let cityName=document.querySelector("h1");
  cityName.innerHTML=response.data.name;
  
  let weatherDescription=document.querySelector("#Description");
  weatherDescription.innerHTML=(response.data.weather[0].description);

  let cityHumidity=document.querySelector("#Humidity");
  cityHumidity.innerHTML=Math.round(response.data.main.humidity);

  let cityWind=document.querySelector("#Wind");
  cityWind.innerHTML=Math.round(response.data.wind.speed);
}

let apiKey= "701f06352d61835bc4fc894e7b084629";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemp);