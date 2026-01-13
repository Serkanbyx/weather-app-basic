# 🌤️ Weather App (Basic)

A modern, user-friendly weather application built with vanilla JavaScript. This basic version works with demo data stored in a JSON file, making it perfect for learning and development without requiring API keys.

[![Created by Serkanby](https://img.shields.io/badge/Created%20by-Serkanby-blue?style=flat-square)](https://serkanbayraktar.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Serkanbyx-181717?style=flat-square&logo=github)](https://github.com/Serkanbyx)

## Features

- **City Search**: Search for weather information by entering a city name
- **Quick Access Buttons**: One-click access to 8 pre-configured cities
- **Detailed Weather Information**: Display temperature, feels-like temperature, wind speed, humidity, and visibility
- **Modern UI/UX**: Beautiful gradient background, smooth animations, and responsive design
- **Real-Time Date Display**: Shows current date and time for the searched city
- **Weather Icons**: Visual representation of weather conditions using Font Awesome icons
- **Error Handling**: User-friendly error messages for invalid city names
- **Accessibility**: ARIA labels and semantic HTML for better screen reader support
- **Mobile Responsive**: Fully responsive design that works on all device sizes

## Live Demo

[🎮 View Live Demo](https://weather-app-basicc.netlify.app/)

## Technologies

- **HTML5**: Semantic and accessible markup structure
- **CSS3**: Modern CSS features including CSS Variables, Grid, Flexbox, Animations, and Gradients
- **Vanilla JavaScript (ES6+)**: Modern JavaScript features including Classes, Async/Await, Arrow Functions, and Template Literals
- **Font Awesome 6.4.0**: Icon library for weather and UI icons
- **JSON**: Demo weather data storage

## Installation

### Local Development

#### Option 1: Direct Browser Opening

1. Clone or download the repository:
   ```bash
   git clone https://github.com/Serkanbyx/weather-app-basic.git
   cd weather-app-basic
   ```

2. Open `index.html` directly in your web browser:
   - Double-click the `index.html` file, or
   - Right-click and select "Open with" → Choose your browser

#### Option 2: Using a Local Server (Recommended)

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open `http://localhost:8000` in your browser.

**Using Node.js (http-server):**
```bash
# Install http-server globally
npm install -g http-server

# Run the server
http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

**Using VS Code Live Server:**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Usage

1. **Search by City Name**:
   - Enter a city name in the search box (e.g., "New York", "London", "Tokyo")
   - Press Enter or click the search button
   - The weather information will be displayed

2. **Quick Access**:
   - Click on any of the quick access city buttons at the bottom
   - The weather information for that city will be displayed instantly

3. **Supported Cities**:
   - New York
   - London
   - Tokyo
   - Paris
   - Berlin
   - Sydney
   - Dubai
   - Mumbai

## How It Works?

### Data Loading

The application loads weather data from a JSON file (`weather-data.json`) using the Fetch API:

```javascript
async loadWeatherData() {
    const response = await fetch('weather-data.json');
    this.weatherData = await response.json();
}
```

### City Search Algorithm

1. User input is normalized (trimmed and converted to lowercase)
2. The application searches for the city in the `weather-data.json` file
3. If found, weather data is displayed; if not, an error message is shown

```javascript
searchCity(cityName) {
    const cityData = this.weatherData.cities[cityName.toLowerCase()];
    if (cityData) {
        this.displayWeather(cityData);
    } else {
        this.showError(`No data found for "${cityName}"`);
    }
}
```

### Weather Display

The application dynamically updates the DOM with weather information:

- **City Name**: Displayed in the header
- **Date & Time**: Current date and time formatted using `toLocaleDateString()`
- **Temperature**: Main temperature display with Celsius unit
- **Weather Icon**: Font Awesome icon based on weather condition
- **Weather Details**: Grid layout showing wind, humidity, feels-like, and visibility

### Date Formatting

The current date and time are formatted using JavaScript's `Intl.DateTimeFormat`:

```javascript
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
```

## Customization

### Add Your Own Cities

Edit `weather-data.json` to add more cities:

```json
{
  "cities": {
    "your-city": {
      "name": "Your City",
      "temperature": 20,
      "feelsLike": 19,
      "description": "sunny",
      "icon": "fa-sun",
      "windSpeed": "10 km/h",
      "humidity": "60%",
      "visibility": "15 km"
    }
  }
}
```

### Change Color Scheme

Modify CSS variables in `styles.css`:

```css
:root {
    --primary-color: #4a90e2;        /* Main color */
    --secondary-color: #50c878;      /* Accent color */
    --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --card-background: rgba(255, 255, 255, 0.95);
    --text-primary: #2c3e50;
    --text-secondary: #7f8c8d;
}
```

### Change Weather Icons

Available Font Awesome weather icons:
- `fa-sun` - Sunny/Clear
- `fa-cloud` - Cloudy
- `fa-cloud-sun` - Partly Cloudy
- `fa-cloud-rain` - Rainy
- `fa-snowflake` - Snowy
- `fa-bolt` - Stormy

### Modify Animation Speed

Adjust animation duration in CSS:

```css
--transition: all 0.3s ease;  /* Change 0.3s to your preferred duration */
```

## Features in Detail

### Completed Features

✅ City search functionality with error handling  
✅ Quick access buttons for 8 pre-configured cities  
✅ Detailed weather information display  
✅ Responsive design for all screen sizes  
✅ Smooth animations and transitions  
✅ Accessibility features (ARIA labels, semantic HTML)  
✅ Real-time date and time display  
✅ Weather icons based on conditions  
✅ Error message handling  
✅ Mobile-friendly interface  

### Future Features

🔮 [ ] OpenWeatherMap API integration for real-time data  
🔮 [ ] 5-day weather forecast  
🔮 [ ] Hourly weather predictions  
🔮 [ ] Temperature unit conversion (Celsius/Fahrenheit)  
🔮 [ ] Weather animations based on conditions  
🔮 [ ] Geolocation API for automatic location detection  
🔮 [ ] Weather history and trends  
🔮 [ ] Multiple language support  
🔮 [ ] Dark/Light theme toggle  
🔮 [ ] Weather alerts and notifications  

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/Serkanbyx/weather-app-basic.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Ensure responsive design

4. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
   
   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Developer

**Serkan Bayraktar**

- 🌐 Website: [serkanbayraktar.com](https://serkanbayraktar.com/)
- 💻 GitHub: [@Serkanbyx](https://github.com/Serkanbyx)
- 📧 Email: serkanbyx1@gmail.com

## Acknowledgments

- **Font Awesome**: For providing beautiful weather and UI icons
- **OpenWeatherMap**: For inspiration and future API integration possibilities
- **Modern CSS**: For gradient backgrounds and animation techniques

## Contact

- 🐛 Found a bug? [Open an issue](https://github.com/Serkanbyx/weather-app-basic/issues)
- 💡 Have a suggestion? [Create a feature request](https://github.com/Serkanbyx/weather-app-basic/issues)
- 📧 Email: serkanbyx1@gmail.com
- 🌐 Website: [serkanbayraktar.com](https://serkanbayraktar.com/)

---

⭐ If you like this project, don't forget to give it a star!
