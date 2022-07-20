import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";
import ForgetPassword from "./components/forgetpassword";
import ResetPassword from "./components/resetpassword";
import Dashboard from './components/dashboard';


export default function App() {
  return (
    <div className="App">
      <Router>
        <div className="auth-wrapper">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgetpassword" component={ForgetPassword} />
            <Route exact path="/resetpassword/:id" component={ResetPassword} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router >
    </div>
  );

}
