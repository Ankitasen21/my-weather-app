// Content.js
import React from "react";
import "./Content.css";
import { Routes, Route } from "react-router-dom";
import WeatherWeekly from "../pages/weekly/WeatherWeekly";
import WeatherDaily from "../pages/daily/WeatherDaily";
import ErrorBoundary from "./ErrorBoundary";
import Weather from "../pages/home/Weather";

function Content({ isOpen }) {
  return (
    <>
      {isOpen ? (
        <div className="open">
          <Routes>
            <Route
              exact
              path="/"
              element={<Weather />}
              errorElement={<ErrorBoundary />}
            />

            <Route
              exact
              path="/weekly"
              element={<WeatherWeekly />}
              errorElement={<ErrorBoundary />}
            />

            <Route
              exact
              path="/daily"
              element={<WeatherDaily />}
              errorElement={<ErrorBoundary />}
            />
          </Routes>
        </div>
      ) : (
        <div className="closed">
          <Routes>
            <Route
              exact
              path="/"
              element={<Weather />}
              errorElement={<ErrorBoundary />}
            />

            <Route
              exact
              path="/weekly"
              element={<WeatherWeekly />}
              errorElement={<ErrorBoundary />}
            />

            <Route
              exact
              path="/daily"
              element={<WeatherDaily />}
              errorElement={<ErrorBoundary />}
            />
          </Routes>
        </div>
      )}
    </>
  );
}

export default Content;
