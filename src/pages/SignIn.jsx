// ============================================================
// SignIn.jsx - Page de connexion
// L'utilisateur entre son email et son mot de passe.
// Quand il clique sur "Sign In", on appelle l'API pour le connecter.
// Si la connexion réussit, on le redirige vers sa page profil.
// ============================================================

// useState : pour gérer les valeurs du formulaire (email, password)
import { useState } from 'react'
// useNavigate : pour rediriger l'utilisateur après la connexion
import { useNavigate } from 'react-router-dom'
// useDispatch : pour envoyer des actions au store Redux
import { useDispatch, useSelector } from 'react-redux'
// On importe notre action async "loginUser" (qu'on va créer dans userSlice)
import { loginUser } from '../store/userSlice'

function SignIn() {
  // ----- STATE LOCAL (propre à ce composant) -----

  // L'email tapé par l'utilisateur
  const [email, setEmail] = useState('')
  // Le mot de passe tapé par l'utilisateur
  const [password, setPassword] = useState('')
  // La case "Remember me"
  const [rememberMe, setRememberMe] = useState(false)

  // On récupère le message d'erreur depuis le store Redux
  const error = useSelector((state) => state.user.error)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // ----- GESTION DE LA SOUMISSION DU FORMULAIRE -----

  const handleSubmit = async (event) => {
    // On empêche le comportement par défaut du formulaire (rechargement de page)
    event.preventDefault()

    // On envoie l'action "loginUser" avec l'email et le password
    // C'est une action async (thunk) : elle appelle l'API en arrière-plan
    const result = await dispatch(loginUser({ email, password }))

    // Si la connexion a réussi (pas d'erreur), on redirige vers /profile
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/profile')
    }
    // Si la connexion échoue, le message d'erreur s'affichera automatiquement
    // car il est stocké dans le store Redux et on le lit avec useSelector
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        {/* Icône utilisateur */}
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit}>
          {/* Champ Email */}
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Case "Remember me" */}
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          {/* Affiche le message d'erreur s'il y en a un */}
          {error && <p className="error-message">{error}</p>}

          {/* Bouton de connexion (type="submit" déclenche handleSubmit) */}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}

export default SignIn
