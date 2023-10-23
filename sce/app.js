function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let day = days[date.getDay() -1];
  return `${day} ${hours}:${minutes}`;

}


function displayForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  if (forecastData && forecastData.length > 0) {
    forecastData.forEach(function (forecastDay, index) {
      if (index < 4) {}
      let maxTemperature = Math.round(forecastDay.temperature.maximum);
      let minTemperature = Math.round(forecastDay.temperature.minimum);
      let iconUrl = forecastDay.condition.icon;
      let timestamp = forecastDay.time * 1000;
      let date = new Date(timestamp);
      let dayOfWeek = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
      }).format(date);

      forecastHTML += `
        <div class="col-3">
          <div class="weather-forecast-date">${dayOfWeek}</div>
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${iconUrl}.png" alt="" width="36"/>
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${maxTemperature}°</span>
            <span class="weather-forecast-temperature-min">${minTemperature}°</span>
          </div>
        </div>
      `;
    });
  } else {
    forecastHTML = "No forecast data available.";
  }

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let pressureElement = document.querySelector("#pressure");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  let celsiusTemperature = response.data.temperature.current;
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
  pressureElement.innerHTML = response.data.temperature.pressure;
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let iconUrl = response.data.condition.icon_url;
  iconElement.setAttribute("src", iconUrl);

  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");

  celsiusLink.addEventListener("click", function () {
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  });

  fahrenheitLink.addEventListener("click", function () {
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
  });

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "o7e846044ae3ef483ab380t172bfa741";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getForecast(coordinates) {
  let apiKey = "o7e846044ae3ef483ab380t172bfa741";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Lagos");
