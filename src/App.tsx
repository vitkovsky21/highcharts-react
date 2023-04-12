import React from "react";
import logo from "./logo.svg";
import "./App.css";
import RootRouter from "./components/RootRouter";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <RootRouter />
    </div>
  );
}

export default App;
