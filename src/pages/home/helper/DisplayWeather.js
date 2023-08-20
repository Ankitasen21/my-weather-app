import React, { useState, useEffect } from "react";
import "./displayweather.css";

function DisplayWeather(props) {
  const [time, setTime] = useState(null);
  const { data } = props;
  const iconurl =
    "http://openweathermap.org/img/wn/" +
    `${data.cod !== 404 ? data.weather[0].icon : null}` +
    ".png";

  async function fetchTimeZoneByCity(city) {
    const apiKey = "7192bb96a5ff4d7898f42030231908";
    const apiUrl = `https://api.weatherapi.com/v1/timezone.json?key=${apiKey}&q=${encodeURIComponent(
      city
    )}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching time zone data:", error);
      return null;
    }
  }

  useEffect(() => {
    async function getLocalTime(inputCity) {
      //const inputCity = "New York"; // Replace with the actual city
      const timeZoneData = await fetchTimeZoneByCity(inputCity);
      if (timeZoneData) {
        console.log("Time zone:", timeZoneData.timezone);
        console.log("Current time:", new Date(timeZoneData.location.localtime));
        const d = new Date(timeZoneData.location.localtime);
        setTime(d.toString());
      }
    }
    getLocalTime(data.name);
  }, [data.name]);

  return (
    <div className="displayweather">
      {data.cod !== 404 ? (
        <React.Fragment>
          <div className="maincard">
            <span className="cardtitle">
              {data.name} , {data.sys.country}. Weather
            </span>
            <span className="cardsubtitle">
              Last Updated: {time}
            </span>
            <h1>
              {Math.floor(data.main.temp - 273.15)}
              <sup>o</sup>C
              <img className="weather-icon" src={iconurl} alt="" srcSet="" />
              <sup className="desc">{data.weather[0].main}</sup>
            </h1>
            <div className="weatherdetails">
              <div className="section1">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h4>High/Low</h4>
                      </td>
                      <td>
                        <span>
                          {Math.floor(data.main.temp_max - 273.15)}/
                          {Math.floor(data.main.temp_min - 273.15)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Humidity</h4>
                      </td>
                      <td>
                        <span>{data.main.humidity} %</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Pressure</h4>
                      </td>
                      <td>
                        <span>{data.main.pressure} hPa</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Visibility</h4>
                      </td>
                      <td>
                        <span>{data.visibility / 1000} Km</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="section2">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h4>Wind</h4>
                      </td>
                      <td>
                        <span>
                          {Math.floor((data.wind.speed * 18) / 5)} km/hr
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Wind Direction</h4>
                      </td>
                      <td>
                        <span>
                          {data.wind.deg}
                          <sup>o</sup> deg
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Sunrise</h4>
                      </td>
                      <td>
                        <span>
                          {new Date(
                            data.sys.sunrise * 1000
                          ).toLocaleTimeString()}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h4>Sunset</h4>
                      </td>
                      <td>
                        <span>
                          {new Date(
                            data.sys.sunset * 1000
                          ).toLocaleTimeString()}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="maincard">
          <h2>{data.message}</h2>
        </div>
      )}
    </div>
  );
}

export default DisplayWeather;
