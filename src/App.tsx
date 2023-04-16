import React from "react";
import "./App.css";
import RootRouter from "./components/RootRouter";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <RootRouter />
    </div>
  );
}

export default App;
