// ============================================================
// App.jsx - Composant principal de l'application
// Il contient le Header, les Routes (pages), et le Footer
// ============================================================

import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      {/* Le Header est affiche sur TOUTES les pages */}
      <Header />

      {/* Routes : on definit quelle page afficher selon l'URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* Le Footer est affiche sur TOUTES les pages */}
      <Footer />
    </>
  )
}

export default App
