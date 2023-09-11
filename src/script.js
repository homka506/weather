        //Date
        let date = new Date();
        let title = document.querySelector("#current_date");
        let time = document.querySelector("#current_time");
        let currentMonth = document.querySelector("#current_month");
        let today = document.querySelector("#current_day");

        let daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let currentHours = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = date.getMonth();
        let monthName = months[month];
        let currentDate = date.getDate();
        let currentDay = daysWeek[date.getDay()];

        title.innerHTML = `${currentDay}`;
        time.innerHTML = `${currentHours}`;
        today.innerHTML = `${currentDate}`;
        currentMonth.innerHTML = `${monthName}`;


        // Current Position
        function retrievePosition(position) {
            let apiKey = "2f02e3ctafa3oa9b5849c5a89408c6d7";
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
            axios.get(apiUrl).then(showWeather);
        }
        navigator.geolocation.getCurrentPosition(retrievePosition);
        // Weather's data
        function showWeather(response) {
            let city = document.querySelector('#city');
            city.innerHTML = `${response.data.city}`;

            let temperature = Math.round(response.data.temperature.current);
            let temperatureElement = document.querySelector('#temperature');
            temperatureElement.innerHTML = `${temperature}`;
            celsiusTemperature = response.data.temperature.current;

            let wind = Math.round(response.data.wind.speed);
            let windElement = document.querySelector('#wind');
            windElement.innerHTML = `${wind} m/s`;

            let humidity = Math.round(response.data.temperature.humidity);
            let humidityElement = document.querySelector('#humidity');
            humidityElement.innerHTML = `${humidity} %`;

            let feelsLike = Math.round(response.data.temperature.feels_like);
            let feelsLikeElement = document.querySelector("#feels_like");
            feelsLikeElement.innerHTML = `${feelsLike}°C`;
            celsiusFillLikeTemperature = response.data.temperature.feels_like;

            let description = document.querySelector("#description");
            description.innerHTML = `${response.data.condition.description}`;

            let descriptionIcon = document.querySelector("#description_icon");
            descriptionIcon.src = response.data.condition.icon_url;
            descriptionIcon.alt = response.data.condition.icon;

            let degree = document.querySelector("#degree");
            degree.innerHTML = `${response.data.wind.degree}`;

            let pressure = document.querySelector("#pressure");
            pressure.innerHTML = `${response.data.temperature.pressure}`;
        }
        //search
        function searchCity() {
            event.preventDefault();
            let cityInput = document.querySelector('#search_input');
            let cityName = cityInput.value;
            let apiKey = '2f02e3ctafa3oa9b5849c5a89408c6d7';
            let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}`;
            axios.get(apiUrl).then(showWeather);
        }

        let celsiusTemperature = null;
        let celsiusFillLikeTemperature = null;

        //click button
        document.querySelector('#current_button').addEventListener('click', function () {
            navigator.geolocation.getCurrentPosition(retrievePosition);
        });
        // search
        document.querySelector('#search_form').addEventListener('submit', searchCity);

        //convert temperature
        function showFahrenheitTemperature(event) {
            event.preventDefault();
            let temperatureElement = document.querySelector('#temperature');
            //remove the active class  the celsius link 
            celsiusLink.classList.remove("active");
            //add the active class  the fahrenheit link 
            fahrenheitLink.classList.add("active");
            let feelsLikeElement = document.querySelector("#feels_like");
            let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
            let fahrenheitFillLikeTemperature = (celsiusFillLikeTemperature * 9) / 5 + 32;
            temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
            feelsLikeElement.innerHTML = Math.round(fahrenheitFillLikeTemperature);
        }

        function showCelsiusTemperature(event) {
            event.preventDefault();
            //add the active class  the celsius link 
            celsiusLink.classList.add("active");
            //remove the active class  the fahrenheit link 
            fahrenheitLink.classList.remove("active");

            let temperatureElement = document.querySelector('#temperature');
            let feelsLikeElement = document.querySelector("#feels_like");
            temperatureElement.innerHTML = Math.round(celsiusTemperature);
            feelsLikeElement.innerHTML = Math.round(celsiusFillLikeTemperature);

        }
        let fahrenheitLink = document.querySelector("#fahrenheit_link");
        fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

        let celsiusLink = document.querySelector("#celsius_link");
        celsiusLink.addEventListener("click", showCelsiusTemperature);