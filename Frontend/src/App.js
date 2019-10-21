import "./App.css";
import React from "react";
import LogIn from "./components/LogIn";
import Register from "./components/Register";
import DashBoard from "./components/DashBoard";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

class App extends React.Component {


  render() {
    return (
      <Router>
        <Switch>
          <div>
            <Route exact path="/Register" component={Register} />
            <Route exact path="/DashBoard/:id/" component={DashBoard} />
            <Route exact path="/" component={LogIn} />
            </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
