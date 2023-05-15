
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






function displayTemp(response){
  celsiusTempValue=response.data.main.temp;
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

  let date =document.querySelector("#Date");
  date.innerHTML=formatDate(response.data.dt*1000);

  let icon=document.querySelector("#icon");
  icon.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
function search(city){
  let apiKey= "701f06352d61835bc4fc894e7b084629";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city} &appid=${apiKey}&units=metric`;

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
celsiusLink.addEventListener("click",celsiusTemp)