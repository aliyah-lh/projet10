// ============================================================
// api.js - Service pour communiquer avec le backend
// Ce fichier contient toutes les fonctions qui appellent l'API
// On centralise les appels ici pour ne pas les éparpiller partout
// ============================================================

// L'URL de base de notre API backend
const API_URL = 'http://localhost:3001/api/v1'

// ----- FONCTION : CONNEXION -----
// Envoie l'email et le mot de passe au backend
// Retourne le token JWT si la connexion réussit
export async function loginAPI(email, password) {
  // fetch() envoie une requête HTTP au serveur
  const response = await fetch(`${API_URL}/user/login`, {
    method: 'POST', // On envoie des données (POST)
    headers: {
      'Content-Type': 'application/json', // On dit au serveur qu'on envoie du JSON
    },
    // On transforme notre objet JavaScript en chaîne JSON
    body: JSON.stringify({ email, password }),
  })

  // On récupère la réponse du serveur en JSON
  const data = await response.json()

  // Si la réponse n'est pas OK (code 200), on lance une erreur
  if (response.status !== 200) {
    throw new Error(data.message || 'Erreur de connexion')
  }

  // On retourne les données (qui contiennent le token)
  return data
}

// ----- FONCTION : RÉCUPÉRER LE PROFIL -----
// Envoie le token JWT au backend pour récupérer les infos de l'utilisateur
export async function getProfileAPI(token) {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: 'GET', // L'API utilise GET pour cette route
    headers: {
      'Content-Type': 'application/json',
      // On envoie le token dans le header "Authorization"
      // Le format est "Bearer <token>" (convention standard)
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await response.json()

  if (response.status !== 200) {
    throw new Error(data.message || 'Erreur lors de la récupération du profil')
  }

  return data
}

// ----- FONCTION : METTRE À JOUR LE USERNAME -----
// Envoie le nouveau userName au backend
export async function updateProfileAPI(token, userName) {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: 'PUT', // PUT = mise à jour d'une ressource existante
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userName }),
  })

  const data = await response.json()

  if (response.status !== 200) {
    throw new Error(data.message || 'Erreur lors de la mise à jour du profil')
  }

  return data
}
