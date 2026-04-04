// ============================================================
// main.jsx - Point d'entrée de l'application React
// C'est le premier fichier qui s'exécute quand l'app démarre
// ============================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
// On importe BrowserRouter pour gérer la navigation (les URLs)
import { BrowserRouter } from 'react-router-dom'
// On importe le Provider de Redux pour rendre le store accessible partout
import { Provider } from 'react-redux'
// On importe notre store Redux (qu'on va créer juste après)
import { store } from './store/store'
// On importe notre composant principal
import App from './App'
// On importe le CSS global
import './App.css'

// On "monte" l'application React dans la div #root du fichier index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider : permet à tous les composants d'accéder au store Redux */}
    <Provider store={store}>
      {/* BrowserRouter : permet d'utiliser les routes (react-router) */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
