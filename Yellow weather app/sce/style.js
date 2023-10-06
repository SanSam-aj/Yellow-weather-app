function formatDate(timestamp)  {
let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    return `${day}  ${hours}:${minutes}`;
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

    celsisusTemperature = response.data.temperature.humidity;

    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = response.data.wind.speed;
    pressureElement.innerHTML = response.data.temperature.pressure;
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    iconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png`;
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png`);
}
function search(city) {
let apiKey = "o7e846044ae3ef483ab380t172bfa741";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}


    function handleSubmit(event) {
        event.preventDefault();
        let cityInputElement = document.querySelector("#city-input")
        search(cityInputElement.value);
    }

    function displayFahrenheitTemperature(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#temperature");
        let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
        temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    }

    function displayCelsiusTemperature(event) {
        event.preventDefault();
        let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = Math.round(celsiusTemperature);
    }
    let celsiusTemperature = null;
    
    

    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);

     let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

    let celsisusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", displayCelsiusTemperature);



    search("Lagos");
