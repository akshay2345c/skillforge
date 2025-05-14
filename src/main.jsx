
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import React from 'react';
import { Provider } from 'react-redux';
import store from "./redux/store.js"
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(

  <React.StrictMode>
  <Provider store={store}>
  <Router>
      <App />
      </Router>
    </Provider>

</React.StrictMode>,
)
