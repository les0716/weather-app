let now = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  " Wednesday",
  " Thursday",
  "Friday",
  "Saturday",
];
let day = weekDays[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

let newDay = document.querySelector("#day-time");
newDay.innerHTML = `${day}, ${hour}:${minute}`;

//function showNewCity(event) {
// event.preventDefault();
//let h1 = document.querySelector("h1");
//let cityInput = document.querySelector("#city-input");
//h1.innerHTML = `${cityInput.value}`;
//}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}
function searchCity(city) {
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showWeather);
}

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = `Wind:${Math.round(
    response.data.wind.speed
  )}mph`;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}
function searchLocation(position) {
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(showWeather);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", displayCurrentLocation);

let fahrenheitLinnk = document.querySelector("#fahrenheit");
fahrenheitLinnk.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("Los Angeles");
