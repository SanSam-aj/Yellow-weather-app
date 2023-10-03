function displayTemperature(response) {
    console.log(response.data);
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
temperatureElement.innerHTML = Math.round (response.data.main.temp);
cityElement.innerHTML = response.data.name;
}


let apikey="o7e846044ae3ef483ab380t172bfa741";
let apiUrl='https://api.shecodes.io/weather/v1/current?Lisbon={Lisbon}&o7e846044ae3ef483ab380t172bfa741={o7e846044ae3ef483ab380t172bfa741}';

axios.get(api.Url).then(displayTemperature);