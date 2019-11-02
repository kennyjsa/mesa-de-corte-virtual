import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import App from "./App";
import VideoPlayer from "./VideoPlayer";

export default function Rotas() {
  return (
    <Router>

      <Switch>
        <Route path="/app">
          <App />
        </Route>
        <Route path="/player">
          <VideoPlayer />
        </Route>
        <Route path="/">
          <Redirect to="/app" />
        </Route>
      </Switch>
    </Router>
  );
}