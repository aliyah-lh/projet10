// ============================================================
// SignIn.jsx - Page de connexion
// Pour l'instant, c'est juste le formulaire HTML converti en React.
// La logique de connexion avec l'API sera ajoutee a l'etape suivante.
// ============================================================

import { useState } from 'react'

function SignIn() {
  // State local pour les champs du formulaire
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  // Pour l'instant, on affiche juste les valeurs dans la console
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Remember me:', rememberMe)
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}

export default SignIn
