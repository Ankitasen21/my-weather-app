import React, { useEffect, useState } from "react";
import "./WeatherWeekly.css";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import Loader from "../../components/Loader";

function WeatherWeekly() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  //get the city
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b6e11356126570da0c34b95c12a4a2fa`
      )
        .then((response) => response.json())
        .then((data) => {
          setCity(data.name);
        })
        .catch((error) => {
          console.error("Error fetching city name:", error);
        });
    }
  }, [latitude, longitude]);

  // get 3-day forecast

  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const API_KEY = "b6e11356126570da0c34b95c12a4a2fa";
    //console.log(city+API_KEY)

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.list) {
          const nextThreeDaysData = data.list
            .slice(4)
            .filter((item) => item.dt_txt.includes("12:00:00"));
          setForecastData(nextThreeDaysData);
        }
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  }, [city]);
  /*
      <ul>
        {forecastData.map((item) => (
          <li key={item.dt}>
            <p>Date: {item.dt_txt}</p>
            <p>Temperature: {Math.floor(item.main.temp - 273.15)}°C</p>
            <p>Weather: {item.weather[0].description}</p>
          </li>
        ))}
      </ul>
      */

  const handleNextCard = () => {
    if (currentCardIndex < forecastData.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date(forecastData[currentCardIndex]?.dt * 1000);

  return (
    <>
      <h2>Next 4 Days Weather Forecast</h2>
      <div className="maincard">
        <img
          src={`https://openweathermap.org/img/w/${forecastData[currentCardIndex]?.weather[0]?.icon}.png`}
          alt="Weather Icon"
          style={{ width: "6rem" }}
        />
        <h3>{weekday[d.getDay()]}</h3>
        <p>
          Date:
          {d.toLocaleDateString()}
        </p>
        <p>
          Temperature:
          {Math.floor(forecastData[currentCardIndex]?.main?.temp - 273.15)}
          °C
        </p>
        <p>
          Description: {forecastData[currentCardIndex]?.weather[0]?.description}
        </p>
        <div className="buttons">
          <button
            onClick={handlePreviousCard}
            disabled={currentCardIndex === 0}
          >
            <FiArrowLeft />
          </button>
          <button
            onClick={handleNextCard}
            disabled={currentCardIndex === forecastData.length - 1}
          >
            <FiArrowRight />
          </button>
        </div>
      </div>
    </>
  );
}

export default WeatherWeekly;
