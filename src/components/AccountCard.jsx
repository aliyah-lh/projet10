// ============================================================
// AccountCard.jsx - Carte "compte bancaire" réutilisable
// Ce composant est utilisé plusieurs fois sur la page profil
// pour afficher chaque compte de l'utilisateur
//
// Props :
//   - title : nom du compte (ex: "Argent Bank Checking (x8349)")
//   - amount : montant (ex: "$2,082.79")
//   - description : type de solde (ex: "Available Balance")
// ============================================================

function AccountCard({ title, amount, description }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        {/* Titre du compte */}
        <h3 className="account-title">{title}</h3>
        {/* Montant */}
        <p className="account-amount">{amount}</p>
        {/* Description du type de solde */}
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        {/* Bouton pour voir les transactions */}
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}

export default AccountCard
