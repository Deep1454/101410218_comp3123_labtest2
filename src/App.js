import React, { useState } from "react";
import WeatherApp from "./components/WeatherApp";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("Toronto");  
  const [searchCity, setSearchCity] = useState("");  

  const handleCityChange = (e) => {
    setSearchCity(e.target.value);  
  };

  const handleSearch = () => {
    if (searchCity.trim()) {
      console.log("Searching for city:", searchCity);
      setCity(searchCity); 
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={searchCity}
        onChange={handleCityChange} 
      />
      <button onClick={handleSearch}>Search</button>  
      <WeatherApp city={city} /> 
    </div>
  );
};

export default App;
