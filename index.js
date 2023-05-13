const API = {
    KEY: "1692469a5018941d856520414dfce7b2",
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather"
}

const search = document.querySelector('.search-box');
console.log(search);
searchBox.addEventListener('keypress', setCityName);


function setCityName(e) {
    if (e.keyCode == 13) {
        fetchWeatherData(searchBox.value);
    }
}



function fetchWeatherData(city) {

    fetch(`${API.BASE_URL}?q=${city}&appid=${API.KEY}`)
        .then((res) => res.json())
        .then(res => displayResults(res))

}

function displayResults(weatherData) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weatherData.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weatherData.weatherData[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weatherData.main.temp_min)}°c / ${Math.round(weatherData.main.temp_max)}°c`;

}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

