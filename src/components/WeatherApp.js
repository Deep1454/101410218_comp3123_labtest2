import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherApp.css";

const WeatherApp = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
        setWeather(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setWeather(null);
        setError("City not found. Please try again.");
      }
    };

    if (city.trim()) {
      fetchWeather();
    }
  }, [city]);

  if (error) return <p className="error">{error}</p>;
  if (!weather) return <p>Loading...</p>;

  const { main, weather: weatherInfo, name } = weather;
  const weatherIconCode = weatherInfo[0].icon;  
  const weatherIconUrl = `${process.env.REACT_APP_ICON_URL}${weatherIconCode}@2x.png`;  

  console.log("Weather Icon URL:", weatherIconUrl);

  return (
    <div className="weather-container">
      <h2>{name}</h2>
      <img src={weatherIconUrl} alt={weatherInfo[0].description} />
      <p className="description">{weatherInfo[0].description}</p>
      <p className="temperature">Temperature: {main.temp}°C</p>
      <p className="humidity">Humidity: {main.humidity}%</p>
      <p className="pressure">Pressure: {main.pressure} hPa</p>
    </div>
  );
};

export default WeatherApp;
