// ============================================================
// FeatureCard.jsx - Carte "avantage" réutilisable
// Composant utilisé 3 fois sur la page d'accueil au lieu de
// copier-coller le HTML (bonne pratique Green Code)
//
// Props :
//   - icon : le chemin vers l'image de l'icône
//   - title : le titre de l'avantage
//   - description : le texte de description
// ============================================================

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-item">
      {/* Lazy loading : l'image se charge seulement quand elle est visible */}
      <img
        src={icon}
        alt={title}
        className="feature-icon"
        loading="lazy"
        width="100"
        height="100"
      />
      {/* Le titre */}
      <h3 className="feature-item-title">{title}</h3>
      {/* La description */}
      <p>{description}</p>
    </div>
  )
}

export default FeatureCard
