import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import AppNavbar from './components/AppNavbar';
import Home from './components/Home';
import DisplayUsers from './components/DisplayUsers';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Projects from './components/Projects/Projects';
import PostProject from './components/Projects/PostProject';
import Leaderboard from './components/Projects/Leaderboard';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    /*async function fetchData() {
        const res = await axios.get('/users');
        setUsers(res.data);
        return res;
    }*/
    async function fetchData() {
    if(localStorage.getItem('token') != null && localStorage.getItem('token') != undefined) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }    
      fetchData();
  }, []) 

  let setLoggedInState = (localStrg) => {
    if(localStrg != null && localStrg != undefined) {
      if(localStrg) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    }
    else {
      if(localStorage.getItem('token')) {
        setIsLoggedIn(true);
      }
      else {
        setIsLoggedIn(false);
      }
    }
  }

  return (
    <Router>
      <div className="App">
        <AppNavbar isLoggedIn={isLoggedIn} setLoggedInState={setLoggedInState}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/students" /*render={(props) => <DisplayUsers {...props} />}*/ component={DisplayUsers}  />  
          <Route exact path="/projects" render={(props) => <Projects {...props} isLoggedIn={isLoggedIn} setLoggedInState={setLoggedInState} />} />  
          <Route exact path="/leaderboard" /*render={(props) => <DisplayUsers {...props} />}*/ component={Leaderboard}  />  
          <Route exact path="/signup" /*render={(props) => <DisplayUsers {...props} />}*/ component={Signup}  />  
          <Route exact path="/login" render={(props) => <Login {...props} isLoggedIn={isLoggedIn} setLoggedInState={setLoggedInState} />}  />  
          <Route exact path="/post-project" /*render={(props) => <DisplayUsers {...props} />}*/ component={PostProject}  />  
          <Route exact path="/students/:studentId" /*render={(props) => <DisplayUsers {...props} />}*/ component={Profile}  />  
        </Switch>
      </div>
    </Router>
  );
}

export default App;
