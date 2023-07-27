import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ContextProvider } from '../context.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </HashRouter>,
)
