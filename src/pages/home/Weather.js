import React, { useState } from "react";
import DisplayWeather from "./helper/DisplayWeather";
import ErrorBoundary from "../../components/ErrorBoundary"
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
  });

  const APIKEY = "b6e11356126570da0c34b95c12a4a2fa";

  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      <ErrorBoundary />
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
  };
  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <h3 className="subtitle"> Enter the name of your city to get the Weather now! </h3>
      <form>
        <div className="field">
          <input
            type="text"
            placeholder="Enter the City"
            name="city"
            onChange={(e) => handleChange(e)}
          />
          <button className="getweather" onClick={(e) => weatherData(e)}>
            Submit
          </button>
        </div>
      </form>
      {weather.data !== undefined ? (
        <div className="display">
          <DisplayWeather data={weather.data} />
        </div>
      ) : <ErrorBoundary />}
    </div>
  );
}

export default Weather;
