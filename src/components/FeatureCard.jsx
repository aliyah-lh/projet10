// ============================================================
// FeatureCard.jsx - Carte "avantage" réutilisable
// Ce composant est utilisé 3 fois sur la page d'accueil
// pour afficher les 3 avantages de la banque (chat, money, security)
//
// Props (= les données qu'on lui passe) :
//   - icon : le chemin vers l'image de l'icône
//   - title : le titre de l'avantage
//   - description : le texte de description
// ============================================================

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-item">
      {/* L'icône de l'avantage */}
      <img src={icon} alt={title} className="feature-icon" />
      {/* Le titre */}
      <h3 className="feature-item-title">{title}</h3>
      {/* La description */}
      <p>{description}</p>
    </div>
  )
}

export default FeatureCard
