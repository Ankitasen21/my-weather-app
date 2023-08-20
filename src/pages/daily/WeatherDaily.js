import React, { useEffect, useState } from "react";
import DisplayWeather from "../home/helper/DisplayWeather";
import Loader from "../../components/Loader";

function WeatherDaily() {
  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    // Get user's geolocation
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
    // Perform reverse geocoding when latitude and longitude change
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b6e11356126570da0c34b95c12a4a2fa`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.name) {
            setWeather({data: data})
            setCityName(data.name);
          }
        })
        .catch((error) => {
          console.error("Error fetching city name:", error);
        });
    }
  }, [latitude, longitude]);

  return (
    <>
      <h1> Daily Weather Update </h1>
      <p>
        {cityName ? (
          <>
          
          <p>Your current city: {cityName}</p>
          <DisplayWeather data={weather.data} />
          </>
        ) : (
          <Loader />
        )}
      </p>
    </>
  );
}

export default WeatherDaily;
