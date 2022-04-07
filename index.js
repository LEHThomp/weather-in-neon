// Timestamp

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Display weather

function displayWeather(response) {
  fahrenheit = response.data.main.temp;
  fahrenheitHigh = response.data.main.temp_max;
  fahrenheitLow = response.data.main.temp_min;
  let iconElement = document.querySelector("#icon");
  let currentTemp = document.querySelector("#current-temp");
  let tempNow = Math.round(fahrenheit);

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  document.querySelector("#city-heading").innerHTML = response.data.name;
  currentTemp.innerHTML = `${tempNow}`;
  document.querySelector("#high-today").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-today").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-condition").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#current-humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#current-windspeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function showDefaultWeather(response) {
  let city = response;
  let apiKey = "937158501a6294eb9c7d178c0f874788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
showDefaultWeather("Toronto");

// Change Temperature to Search City

function showSearchWeather(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-bar");
  let city = `${searchCityInput.value}`;
  let apiKey = "937158501a6294eb9c7d178c0f874788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}
let citySearched = document.querySelector("#search-new-city");
citySearched.addEventListener("submit", showSearchWeather);

// Current location button

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "937158501a6294eb9c7d178c0f874788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrent(event) {
  event.preventDefault();
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

function toCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let currentTemperature = document.querySelector("#current-temperature");
  let highTemperature = document.querySelector("#high-today");
  let lowTemperature = document.querySelector("#low-today");
  let celsius = Math.round((fahrenheit - 32) * (5 / 9));
  let celsiusHigh = Math.round((fahrenheitHigh - 32) * (5 / 9));
  let celsiusLow = Math.round((fahrenheitLow - 32) * (5 / 9));
  currentTemperature.innerHTML = celsius;
  highTemperature.innerHTML = celsiusHigh;
  lowTemperature.innerHTML = celsiusLow;

  forecastMax.forEach(function (element, index) {
    document.querySelector(`#max${index + 1}`).innerHTML = `${Math.round(
      (element - 32) * (5 / 9)
    )}°`;
  });

  forecastMin.forEach(function (element, index) {
    document.querySelector(`#min${index + 1}`).innerHTML = `${Math.round(
      (element - 32) * (5 / 9)
    )}°`;
  });
}

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

celsiusLink.addEventListener("click", toCelsius);

fahrenheitLink.addEventListener("click", toFahrenheit);

function toFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temperature");
  let highTemperature = document.querySelector("#high-today");
  let lowTemperature = document.querySelector("#low-today");
  let fahrenheitTemperature = Math.round(fahrenheit);
  let fahrenheitHighTemperature = Math.round(fahrenheitHigh);
  let fahrenheitLowTemperature = Math.round(fahrenheitLow);
  currentTemperature.innerHTML = fahrenheitTemperature;
  highTemperature.innerHTML = fahrenheitHighTemperature;
  lowTemperature.innerHTML = fahrenheitLowTemperature;

  forecastMax.forEach(function (element, index) {
    document.querySelector(`#max${index + 1}`).innerHTML = `${element}°`;
  });
  forecastMin.forEach(function (element, index) {
    document.querySelector(`#min${index + 1}`).innerHTML = `${element}°`;
  });
}

function displayForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 6)) {
      forecastHTML =
        forecastHTML +
        `<div class="card col-2 mid">
             <div class="card-body">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
   
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="${forecastDay.weather[0].description}"
          width="54"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max" id=max${index}> ${Math.round(
          forecastDay.temp.max
        )}° </span>
          <span class="weather-forecast-temperature-min" id=min${index}> ${Math.round(
          forecastDay.temp.min
        )}° </span>
          </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  dailyForecast.forEach(function (forecastDay, index) {
    if ((index > 0) & (index < 6)) {
      forecastMax[index - 1] = Math.round(forecastDay.temp.max);
      forecastMin[index - 1] = Math.round(forecastDay.temp.min);
    }
  });
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "937158501a6294eb9c7d178c0f874788";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

let fahrenheit = null;
let fahrenheitHigh = null;
let fahrenheitLow = null;

let forecastMax = ["", "", "", "", ""];
let forecastMin = ["", "", "", "", ""];
