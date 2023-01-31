import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState({});

  const Search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      if (data !== undefined) {
        setError(false);
        setWeather(data);
        setQuery("");
      } else {
        setError(true);
        setWeather({ name: "the city isn't exist ⭕" });
      }
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={Search}
      />

      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
      {error && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
          </h2>
        </div>
      )}
    </div>
  );
}

export default App;
