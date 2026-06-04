// Weather App - Basic Version with Demo Data

class WeatherApp {
    constructor() {
        this.weatherData = null;
        this.currentCity = null;
        this.init();
    }

    async init() {
        await this.loadWeatherData();
        this.setupEventListeners();
        this.renderCityButtons();
    }

    async loadWeatherData() {
        try {
            const response = await fetch('weather-data.json');
            this.weatherData = await response.json();
        } catch (error) {
            console.error('Failed to load weather data:', error);
            this.showError('An error occurred while loading data.');
        }
    }

    setupEventListeners() {
        const searchBtn = document.getElementById('searchBtn');
        const cityInput = document.getElementById('cityInput');

        searchBtn.addEventListener('click', () => this.handleSearch());
        
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        cityInput.addEventListener('input', () => {
            this.hideError();
        });
    }

    handleSearch() {
        const cityInput = document.getElementById('cityInput');
        const cityName = cityInput.value.trim().toLowerCase();

        if (!cityName) {
            this.showError('Please enter a city name.');
            return;
        }

        this.searchCity(cityName);
    }

    searchCity(cityName) {
        if (!this.weatherData) {
            this.showError('Data has not loaded yet. Please wait...');
            return;
        }

        const cityData = this.weatherData.cities[cityName];

        if (!cityData) {
            this.showError(`No data found for "${cityName}". Please try a different city.`);
            return;
        }

        this.currentCity = cityData;
        this.displayWeather(cityData);
        this.hideError();
    }

    displayWeather(cityData) {
        const weatherCard = document.getElementById('weatherCard');
        weatherCard.classList.remove('hidden');

        // Update city name and date
        document.getElementById('cityName').textContent = cityData.name;
        document.getElementById('dateTime').textContent = this.getCurrentDateTime();

        // Update weather icon (Font Awesome renders via the inner <i> element)
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.replaceChildren(this.createIcon(cityData.icon));

        // Update temperature
        document.getElementById('temperature').textContent = cityData.temperature;

        // Update description
        document.getElementById('description').textContent = cityData.description;

        // Update details
        document.getElementById('windSpeed').textContent = cityData.windSpeed;
        document.getElementById('humidity').textContent = cityData.humidity;
        document.getElementById('feelsLike').textContent = `${cityData.feelsLike}°C`;
        document.getElementById('visibility').textContent = cityData.visibility;
    }

    createIcon(iconClass) {
        const icon = document.createElement('i');
        icon.className = `fas ${iconClass}`;
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }

    getCurrentDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        // toLocaleString honors the time options; toLocaleDateString would drop them.
        return now.toLocaleString('en-US', options);
    }

    renderCityButtons() {
        if (!this.weatherData) return;

        const cityButtonsContainer = document.getElementById('cityButtons');
        const cities = Object.keys(this.weatherData.cities);

        const buttons = cities.map((cityKey) => {
            const button = document.createElement('button');
            button.className = 'city-btn';
            button.type = 'button';
            button.textContent = this.weatherData.cities[cityKey].name;
            button.addEventListener('click', () => {
                document.getElementById('cityInput').value = '';
                this.searchCity(cityKey);
            });
            return button;
        });

        cityButtonsContainer.replaceChildren(...buttons);
    }

    showError(message) {
        const errorElement = document.getElementById('errorMessage');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    hideError() {
        const errorElement = document.getElementById('errorMessage');
        errorElement.classList.remove('show');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});
