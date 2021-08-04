import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//  PROVIDER E STORE
import { Provider } from 'react-redux';
//  Persisted state
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './utils/store';
//PACKAGES
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
