import React from "react";
import "./App.css";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">COVID Hackathon</h1>
          <Navigation />
        </header>
        <div className="App-body">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
