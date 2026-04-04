// ============================================================
// Header.jsx - Barre de navigation
// Ce composant s'affiche sur TOUTES les pages.
// Il change selon si l'utilisateur est connecté ou non :
//   - Non connecté : affiche "Sign In"
//   - Connecté : affiche le nom de l'utilisateur + "Sign Out"
// ============================================================

// Link et useNavigate servent à naviguer entre les pages
import { Link, useNavigate } from 'react-router-dom'
// useSelector : lire des données dans le store Redux
// useDispatch : envoyer des actions au store Redux
import { useSelector, useDispatch } from 'react-redux'
// On importe l'action "logout" de notre slice Redux
import { logout } from '../store/userSlice'

function Header() {
  // On récupère les infos de l'utilisateur depuis le store Redux
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const user = useSelector((state) => state.user.user)

  // useDispatch nous permet d'envoyer des actions au store
  const dispatch = useDispatch()
  // useNavigate nous permet de rediriger l'utilisateur vers une autre page
  const navigate = useNavigate()

  // Fonction appelée quand on clique sur "Sign Out"
  const handleSignOut = () => {
    // On envoie l'action "logout" au store pour vider les infos utilisateur
    dispatch(logout())
    // On redirige vers la page d'accueil
    navigate('/')
  }

  return (
    <nav className="main-nav">
      {/* Logo qui ramène à la page d'accueil */}
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {/* Si l'utilisateur est connecté, on affiche son nom + Sign Out */}
        {isLoggedIn ? (
          <>
            {/* Lien vers la page profil avec le nom de l'utilisateur */}
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {' '}{user.userName || user.firstName}
            </Link>
            {/* Lien de déconnexion (on utilise <Link> comme dans le HTML d'origine) */}
            <Link
              className="main-nav-item"
              to="/"
              onClick={handleSignOut}
            >
              <i className="fa fa-sign-out"></i>
              {' '}Sign Out
            </Link>
          </>
        ) : (
          // Si pas connecté, on affiche "Sign In"
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            {' '}Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header
