        //Date
        let date = new Date();
        let title = document.querySelector("#current_date");
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ]
        let currentHours = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        let currentDay = days[date.getDay()];
        title.innerHTML = ` ${currentDay} ${currentHours}`;
        // Current Position
        function retrievePosition(position) {
            let apiKey = "2718952144ed077c12e7c160fb6fc351";
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            axios.get(apiUrl).then(showWeather);
        }
        navigator.geolocation.getCurrentPosition(retrievePosition);
        // Weather's data
        function showWeather(response) {
            let city = document.querySelector('#city');
            city.innerHTML = `${response.data.name}`;

            let temperature = Math.round(response.data.main.temp);
            let temperatureElement = document.querySelector('#temperature');
            temperatureElement.innerHTML = `${temperature}°C`;

            let wind = Math.round(response.data.wind.speed);
            let windElement = document.querySelector('#wind');
            windElement.innerHTML = `${wind} m/s`;

            let humidity = Math.round(response.data.main.humidity);
            let humidityElement = document.querySelector('#humidity');
            humidityElement.innerHTML = `${humidity} %`;
        }
        //search
        function searchCity() {
            event.preventDefault();
            let cityInput = document.querySelector('#search_input');
            let cityName = cityInput.value;
            let apiKey = '2718952144ed077c12e7c160fb6fc351';
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

            axios.get(apiUrl).then(showWeather);
        }
        //click button
        document.querySelector('#current_button').addEventListener('click', function () {
            navigator.geolocation.getCurrentPosition(retrievePosition);
        });
        // search
        document.querySelector('#search_form').addEventListener('submit', searchCity);