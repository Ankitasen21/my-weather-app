// App.js
import React, { useState } from "react";
import SideBar from "./components/SideBar";
import Content from "./components/Content";
import "./App.css";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Content isOpen={isSidebarOpen} />
    </div>
  );
}

export default App;
