// ============================================================
// App.jsx - Composant principal de l'application
// Il contient le Header, les Routes (pages), et le Footer
// ============================================================

// On importe Routes et Route de react-router-dom pour la navigation
import { Routes, Route } from 'react-router-dom'

// On importe nos composants réutilisables
import Header from './components/Header'
import Footer from './components/Footer'

// On importe nos pages
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'

// On importe le composant qui protège les routes (accès réservé aux connectés)
import ProtectedRoute from './router/ProtectedRoute'

function App() {
  return (
    <>
      {/* Le Header est affiché sur TOUTES les pages */}
      <Header />

      {/* Routes : on définit quelle page afficher selon l'URL */}
      <Routes>
        {/* Page d'accueil : URL = "/" */}
        <Route path="/" element={<Home />} />

        {/* Page de connexion : URL = "/sign-in" */}
        <Route path="/sign-in" element={<SignIn />} />

        {/* Page profil : URL = "/profile" - PROTÉGÉE (il faut être connecté) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Le Footer est affiché sur TOUTES les pages */}
      <Footer />
    </>
  )
}

export default App
