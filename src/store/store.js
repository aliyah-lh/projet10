// ============================================================
// store.js - Configuration du store Redux
//
// Le "store" c'est comme un grand coffre-fort qui contient
// toutes les données partagées de l'application.
// Ici on a un seul slice (user), mais on pourrait en ajouter d'autres.
// ============================================================

import { configureStore } from '@reduxjs/toolkit'
// On importe le reducer de notre userSlice
import userReducer from './userSlice'

// On crée le store avec configureStore (fourni par Redux Toolkit)
export const store = configureStore({
  // On liste tous les reducers de l'application
  reducer: {
    // "user" = le nom qu'on utilisera pour accéder aux données
    // Par exemple : state.user.token, state.user.isLoggedIn, etc.
    user: userReducer,
  },
})
