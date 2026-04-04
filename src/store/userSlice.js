// ============================================================
// userSlice.js - Le "slice" Redux pour gérer l'utilisateur
//
// Un "slice" c'est un morceau du store qui gère UN sujet.
// Ici, on gère tout ce qui concerne l'utilisateur :
//   - Son token de connexion
//   - Ses informations (nom, prénom, userName...)
//   - S'il est connecté ou non
//   - Les erreurs éventuelles
//
// On utilise createSlice de Redux Toolkit pour simplifier le code.
// On utilise createAsyncThunk pour les appels API (actions async).
// ============================================================

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// On importe nos fonctions API
import { loginAPI, getProfileAPI, updateProfileAPI } from '../services/api'

// ============================================================
// ACTIONS ASYNC (thunks)
// Ce sont des actions qui font des appels API (asynchrones).
// Elles ont 3 états : pending (en cours), fulfilled (réussi), rejected (échoué)
// ============================================================

// ----- ACTION : CONNEXION -----
// On crée un "thunk" qui appelle l'API de login
export const loginUser = createAsyncThunk(
  'user/login', // Nom de l'action (pour le debug)
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // On appelle notre fonction API
      const data = await loginAPI(email, password)
      // On retourne le token (il sera récupéré dans "fulfilled")
      return data.body.token
    } catch (error) {
      // En cas d'erreur, on retourne le message d'erreur
      return rejectWithValue(error.message)
    }
  }
)

// ----- ACTION : RÉCUPÉRER LE PROFIL -----
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (token, { rejectWithValue }) => {
    try {
      const data = await getProfileAPI(token)
      // On retourne les infos du profil
      return data.body
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// ----- ACTION : METTRE À JOUR LE USERNAME -----
export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async ({ token, userName }, { rejectWithValue }) => {
    try {
      const data = await updateProfileAPI(token, userName)
      // On retourne les infos mises à jour
      return data.body
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// ============================================================
// LE SLICE (la configuration du store pour l'utilisateur)
// ============================================================

const userSlice = createSlice({
  name: 'user', // Nom du slice

  // ----- ÉTAT INITIAL -----
  // C'est l'état du store au démarrage de l'application
  initialState: {
    token: null, // Le token JWT (null = pas connecté)
    user: {
      // Les infos de l'utilisateur
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
    },
    isLoggedIn: false, // Est-ce que l'utilisateur est connecté ?
    error: null, // Message d'erreur (null = pas d'erreur)
  },

  // ----- REDUCERS (actions synchrones) -----
  // Ce sont des actions simples qui modifient le state directement
  reducers: {
    // Action "logout" : on remet tout à zéro
    logout: (state) => {
      state.token = null
      state.user = { firstName: '', lastName: '', userName: '', email: '' }
      state.isLoggedIn = false
      state.error = null
    },
  },

  // ----- EXTRA REDUCERS (pour gérer les résultats des thunks) -----
  // C'est ici qu'on dit : "quand l'appel API réussit, fais ceci"
  //                        "quand l'appel API échoue, fais cela"
  extraReducers: (builder) => {
    // --- LOGIN ---
    builder
      // Quand le login RÉUSSIT
      .addCase(loginUser.fulfilled, (state, action) => {
        // On stocke le token reçu du serveur
        state.token = action.payload
        // L'utilisateur est maintenant connecté
        state.isLoggedIn = true
        // On efface les erreurs précédentes
        state.error = null
      })
      // Quand le login ÉCHOUE
      .addCase(loginUser.rejected, (state, action) => {
        // On stocke le message d'erreur pour l'afficher
        state.error = action.payload || 'Email ou mot de passe incorrect'
      })

    // --- FETCH PROFILE ---
    builder
      // Quand la récupération du profil RÉUSSIT
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        // On stocke les infos de l'utilisateur
        state.user = action.payload
      })
      // Quand la récupération du profil ÉCHOUE
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload
      })

    // --- UPDATE USERNAME ---
    builder
      // Quand la mise à jour du username RÉUSSIT
      .addCase(updateUserName.fulfilled, (state, action) => {
        // On met à jour les infos de l'utilisateur dans le store
        state.user = action.payload
      })
      // Quand la mise à jour du username ÉCHOUE
      .addCase(updateUserName.rejected, (state, action) => {
        state.error = action.payload
      })
  },
})

// On exporte l'action "logout" pour pouvoir l'utiliser dans les composants
export const { logout } = userSlice.actions

// On exporte le reducer pour l'ajouter au store
export default userSlice.reducer
