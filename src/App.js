import React, { useState, useEffect } from 'react';
import './App.css';
//PACKAGES
import { Route, Switch, Redirect } from 'react-router-dom';
//COMPONENTS
import Login from './pages/Global/Login/login';
import Error404 from './pages/Global/Error/error';
import Drawer from './Global/Drawer1';
import Router from './Router';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

const App = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Login />
        </Route>
        <Route path='/app'>
          <Drawer>
            <Router windowDimensions={windowDimensions} />
          </Drawer>
        </Route>
        <Route exact path='/404' component={Error404} />
        <Route path='*'>
          <Redirect to='/404' />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
