import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css";

const WeatherApp = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const currentWeatherUrl = `${process.env.REACT_APP_API_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
        const currentResponse = await axios.get(currentWeatherUrl);
        setCurrentWeather(currentResponse.data);

        const forecastUrl = `${process.env.REACT_APP_API_URL}/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
        const forecastResponse = await axios.get(forecastUrl);
        setForecast(forecastResponse.data);

        setError(""); 
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setCurrentWeather(null);
        setForecast(null);
        setError("City not found. Please try again.");
      }
    };

    if (city.trim()) {
      fetchWeather();
    }
  }, [city]);

  if (error) return <p className="error">{error}</p>;
  if (!currentWeather || !forecast) return <p className="loading">Loading...</p>;

  const { main, weather: weatherInfo, name,sys,wind} = currentWeather;
  const { list } = forecast;
  const weatherIconCode = weatherInfo[0].icon;
  const weatherIconUrl = `${process.env.REACT_APP_ICON_URL}${weatherIconCode}@2x.png`;

  return (
    <div className="weather-container">
      <div className="current-weather">
        <h2>{name},{sys.country}</h2>
        <p>{weatherInfo[0].description}</p>
        <div className="weather-info">
          <img src={weatherIconUrl} alt={weatherInfo[0].description} />
          <p>{main.temp}°C</p>
          <p>Humidity: {main.humidity}%</p>
          <p>Pressure: {main.pressure} hPa</p>
          <p>Feels Like: {main.feels_like}°C</p>
          <p>Wind Speed: {wind.speed} km/h</p>
        </div>
      </div>

      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-days">
          {list.slice(0, 5).map((day, index) => {
            const dayIcon = `${process.env.REACT_APP_ICON_URL}${day.weather[0].icon}@2x.png`;
            return (
              <div key={index} className="forecast-day">
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <img src={dayIcon} alt={day.weather[0].description} />
                <p>{day.main.temp}°C</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
