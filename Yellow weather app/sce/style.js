function displayTemperature(response) {
    console.log(response.data);
let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = response.data.wind.speed;
}


let apiKey = "o7e846044ae3ef483ab380t172bfa741";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=o7e846044ae3ef483ab380t172bfa741&units=metric`;
axios.get(apiUrl).then(displayTemperature);