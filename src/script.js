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

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ad793a6d772939c31783de5822791acf";
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(url);
  axios.get(url).then(displayForecast);
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
  getForecast(response.data.coord);
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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
 <div class="col-2" id="forecast">
        <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }.png"
          alt=""
          width="61"
        />
        <div class="temperatures">
          <span class="temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>|
          <span class="temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let celsiusTemperature = null;

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", displayCurrentLocation);

let fahrenheitLinnk = document.querySelector("#fahrenheit");
fahrenheitLinnk.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

searchCity("Los Angeles");
