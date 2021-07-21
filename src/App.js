import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Wheather from './components/Wheather/Wheather';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  const [title, updateTitle] = useState(null);
  return (
    <Router>
    <div className="App">
      
        <div className="container d-flex align-items-center flex-column">
          <Switch>
            <Route path="/" exact={true}>
            <Header title={title}/>
              <RegistrationForm updateTitle={updateTitle}/>
            </Route>
           
            <Route path="/wheather">
              <Wheather updateTitle={updateTitle}/>
            </Route> 

          </Switch>
        
        </div>
    </div>
    </Router>
  );
}

export default App;
