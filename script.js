function showWeather(response) {
    let h2 = document.querySelector("#temperature");
    let temperature = Math.round(response.data.main.temp);
    h2.innerHTML = `${temperature}°C`;
}

function retrievePosition(position) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
