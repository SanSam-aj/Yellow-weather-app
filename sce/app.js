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
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day}  ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Thu", "Fri", "Sat", "Sun"];

  days.forEach(function (day) {
    forecastHTML += `
      <div class="col-3">
        <div class="weather-forecast-date">${day}</div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" alt="" width="36"/>
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">18°</span>
          <span class="weather-forecast-temperature-min">12°</span>
        </div>
      </div>
    `;
  });

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

  console.log(iconUrl);

  let celsiusLink = document.querySelector("#celsius-link");
  let fahrenheitLink = document.querySelector("#fahrenheit-link");

  celsiusLink.addEventListener("click", function() {
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
  });

  fahrenheitLink.addEventListener("click", function() {
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
  });
}


function search(city) {
  let apiKey = "o7e846044ae3ef483ab380t172bfa741";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Lagos");
displayForecast();