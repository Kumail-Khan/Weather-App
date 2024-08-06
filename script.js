const apiKey = "650cf0082414f0d4a0aa4deebb54c2a5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector("#search");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const notFound = document.querySelector(".not-found-msg")

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        // Update weather icon dynamically
        const weatherMain = data.weather[0].main.toLowerCase();
        const validWeatherTypes = ["clouds", "clear", "drizzle", "mist", "snow", "rain"];

        if (validWeatherTypes.includes(weatherMain)) {
            weatherIcon.src = `/images/${weatherMain}.png`;
        } else {
            // Default icon if the weather type is not in our list
            weatherIcon.src = "/images/rain.png";
        }

        document.querySelector(".weather").style.display = "block"

    } catch (error) {
        console.error("Error fetching weather data:", error);
        // You might want to display an error message to the user here
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

// Optionally, add an event listener for the 'Enter' key
searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            alert("Please enter a city name");
        }
    }
});
