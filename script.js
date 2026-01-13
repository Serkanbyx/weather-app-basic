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

        // Update weather icon
        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.className = `weather-icon ${cityData.icon}`;
        weatherIcon.innerHTML = `<i class="fas ${cityData.icon}"></i>`;

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
        return now.toLocaleDateString('en-US', options);
    }

    renderCityButtons() {
        if (!this.weatherData) return;

        const cityButtonsContainer = document.getElementById('cityButtons');
        const cities = Object.keys(this.weatherData.cities);

        cityButtonsContainer.innerHTML = cities.map(cityKey => {
            const cityName = this.weatherData.cities[cityKey].name;
            return `
                <button class="city-btn" data-city="${cityKey}">
                    ${cityName}
                </button>
            `;
        }).join('');

        // Add event listeners to city buttons
        cityButtonsContainer.querySelectorAll('.city-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cityKey = e.target.getAttribute('data-city');
                document.getElementById('cityInput').value = '';
                this.searchCity(cityKey);
            });
        });
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
