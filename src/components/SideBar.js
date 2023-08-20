// Sidebar.js
import React from "react";
import "./SideBar.css";
import * as FaIconsList from "react-icons/fa6";
import * as WiIconsList from "react-icons/wi";
import * as RiIconsList from "react-icons/ri";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {isOpen ? (
        <div className="sidebar-open">
          <button className="toggleButton" onClick={toggleSidebar}>
            <FaIconsList.FaBarsStaggered
              style={{ width: "2rem", height: "2rem" }}
            />
          </button>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/daily">Weather here</a>
            </li>
            <li>
              <a href="/weekly">Weekly Forecast</a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="sidebar_closed">
          <button className="toggleButton" onClick={toggleSidebar}>
            <FaIconsList.FaBars style={{ width: "2rem", height: "2rem" }} />
          </button>
          <ul>
            <li>
              <a href="/">
                <RiIconsList.RiHome7Fill
                  style={{ width: "2rem", height: "2rem" }}
                />
              </a>
            </li>
            <li>
              <a href="/daily">
                <RiIconsList.RiSunCloudyFill
                  style={{ width: "2rem", height: "2rem" }}
                />
              </a>
            </li>
            <li>
              <a href="/weekly">
                <WiIconsList.WiDayCloudyWindy
                  style={{ width: "2rem", height: "2rem" }}
                />
              </a>
            </li>
           
          </ul>
        </div>
      )}
    </>
  );
}

export default Sidebar;
