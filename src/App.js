import React, { useState } from "react";
import "./App.css"; 
import WeatherApp from "./components/WeatherApp"; 

const App = () => {
  const [city, setCity] = useState("Toronto"); 
  const [searchCity, setSearchCity] = useState(""); 

  const handleCityChange = (e) => {
    setSearchCity(e.target.value); 
  };

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity); 
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={searchCity}
          onChange={handleCityChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <WeatherApp city={city} />
    </div>
  );
};

export default App;
