// ============================================================
// main.jsx - Point d'entree de l'application React
// C'est le premier fichier qui s'execute quand l'app demarre
// ============================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
// BrowserRouter permet de gerer la navigation (les URLs)
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './App.css'

// On "monte" l'application React dans la div #root du fichier index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
