// ============================================================
// Header.jsx - Barre de navigation
// Ce composant s'affiche sur TOUTES les pages.
// Pour l'instant, il affiche juste le logo et "Sign In".
// On ajoutera la logique de connexion/deconnexion plus tard.
// ============================================================

import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className="main-nav">
      {/* Logo qui ramene a la page d'accueil */}
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {/* Lien vers la page de connexion */}
        <Link className="main-nav-item" to="/sign-in">
          <i className="fa fa-user-circle"></i>
          {' '}Sign In
        </Link>
      </div>
    </nav>
  )
}

export default Header
