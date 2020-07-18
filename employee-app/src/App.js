import React from 'react';
import './App.css';
import Home from './components/Home';
import Department from './components/Department';
import Employee from './components/Employee';

import Navigation from './components/Navigation';

import { BrowserRouter, Route, Link, Switch } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <div className="container">

        <h3 className="m-3 d-flex justify-content-center">React JS With web API Demo</h3>
        <h3 className="m-3 d-flex justify-content-center">Employee management Portal</h3>



        <Navigation />


        <switch>
          <Route path='/' component={Home} exact />
          <Route path='/Department' component={Department} exact />
          <Route path='/employee' component={Employee} exact />

        </switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
