function defaultSetting(response) {
  document.querySelector("#city-heading").innerHTML = "Toronto";
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high-today").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-today").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-precipitation").innerHTML =
    response.data.clouds.all;
}
function showDefaultWeather(response) {
  let city = "Toronto";
  let apiKey = "937158501a6294eb9c7d178c0f874788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(defaultSetting);
}
showDefaultWeather();

// Change City Heading
function searchCity(event) {
  event.preventDefault();
  let cityHeading = document.querySelector("#city-heading");
  let searchInput = document.querySelector("#search-bar");
  cityHeading.innerHTML = `${searchInput.value}`;
}
let newCity = document.querySelector("#search-new-city");
newCity.addEventListener("submit", searchCity);

// Change Temperature to Search City
function displayWeather(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high-today").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-today").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-precipitation").innerHTML =
    response.data.clouds.all;
}
function showSearchWeather(response) {
  let searchCityInput = document.querySelector("#search-bar");
  let city = `${searchCityInput.value}`;
  let apiKey = "937158501a6294eb9c7d178c0f874788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
let citySearched = document.querySelector("#search-new-city");
citySearched.addEventListener("submit", showSearchWeather);

// Current location button
function showTemp(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high-today").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-today").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#current-precipitation").innerHTML =
    response.data.clouds.all;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "937158501a6294eb9c7d178c0f874788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}
function getCurrent() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentNav = document.querySelector("#current-location");
currentNav.addEventListener("click", getCurrent);

// Time and date
let now = new Date();
function formatDate(date) {
  let currentDay = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay];
  let currentMonth = now.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentMonth];
  let year = now.getFullYear();
  let dateToday = now.getDate();
  return `${day}, ${month} ${dateToday}, ${year}`;
}
let currentDate = document.querySelector("#date");
currentDate.innerHTML = formatDate(now);

function formatTime(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let currentTime = document.querySelector("#time");
currentTime.innerHTML = formatTime(now);

// Change Temperature from Fahrenheit to Celsius

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `19° C`;
}

let celsiusLink = document.querySelector("#change-temp-unit");
celsiusLink.addEventListener("click", convertToCelsius);

function changeTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");

  if (currentUnit === "ºF") {
    currentTemp.innerHTML = "19°C";
    tempLink.innerHTML = "Switch to ºF";
    currentUnit = "ºC";
  } else {
    currentTemp.innerHTML = "40°F";
    tempLink.innerHTML = "Switch to °C";
    currentUnit = "ºF";
  }
}

let tempLink = document.querySelector("#change-temp-unit");
tempLink.addEventListener("click", changeTemp);
let currentUnit = "ºF";