// Keep your existing API Key
const apiKey = "2678334241ab9797200471041aab74e3";

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const errorMessageP = document.getElementById('errorMessage');
const weatherDataDiv = document.getElementById('weatherData');

const showLoading = () => {
    loadingDiv.classList.remove('hidden');
    errorDiv.classList.add('hidden');
    weatherDataDiv.classList.add('hidden');
};

const showError = (msg) => {
    errorMessageP.textContent = msg;
    errorDiv.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
    weatherDataDiv.classList.add('hidden');
};

const showWeather = (data) => {
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('country').textContent = data.sys.country;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;
    document.getElementById('temperature').textContent = Math.round(data.main.temp) + "°C";
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = Math.round(data.main.feels_like) + "°C";
    document.getElementById('humidity').textContent = data.main.humidity + "%";
    document.getElementById('windSpeed').textContent = data.wind.speed + " m/s";
    document.getElementById('pressure').textContent = data.main.pressure + " hPa";
    
    weatherDataDiv.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
};

const fetchWeather = async (city) => {
    if (!city) {
        showError("Enter a city name");
        return;
    }
    showLoading();
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Error");
        }
        const data = await res.json();
        showWeather(data);
    } catch (e) {
        showError("Could not fetch weather. " + e.message);
    }
};

searchBtn.addEventListener('click', () => fetchWeather(cityInput.value.trim()));
cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') fetchWeather(cityInput.value.trim());
});