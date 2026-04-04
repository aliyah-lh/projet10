// ============================================================
// ProtectedRoute.jsx - Composant de route protégée
//
// Ce composant empêche l'accès à certaines pages si l'utilisateur
// n'est pas connecté. Si on essaie d'aller sur /profile sans
// être connecté, on est redirigé vers la page de connexion.
//
// Comment ça marche :
//   - On vérifie isLoggedIn dans le store Redux
//   - Si connecté : on affiche la page demandée (children)
//   - Si pas connecté : on redirige vers /sign-in
// ============================================================

import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  // On vérifie si l'utilisateur est connecté
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  // Si pas connecté, on redirige vers la page de connexion
  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />
  }

  // Si connecté, on affiche le contenu de la page (children)
  return children
}

export default ProtectedRoute
