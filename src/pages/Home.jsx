// ============================================================
// Home.jsx - Page d'accueil
// C'est la page qu'on voit quand on arrive sur le site (URL "/")
// Elle contient la bannière (hero) et les 3 avantages (features)
// ============================================================

import FeatureCard from '../components/FeatureCard'

function Home() {
  // On définit les données des 3 avantages dans un tableau
  // Comme ça, on utilise .map() pour générer les 3 cartes automatiquement
  const features = [
    {
      icon: '/img/icon-chat.png',
      title: 'You are our #1 priority',
      description:
        'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.',
    },
    {
      icon: '/img/icon-money.png',
      title: 'More savings means higher rates',
      description:
        'The more you save with us, the higher your interest rate will be!',
    },
    {
      icon: '/img/icon-security.png',
      title: 'Security you can trust',
      description:
        'We use top of the line encryption to make sure your data and money is always safe.',
    },
  ]

  return (
    <main>
      {/* Section Hero : la grande bannière avec l'image de l'arbre */}
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>

      {/* Section Features : les 3 avantages */}
      <section className="features">
        <h2 className="sr-only">Features</h2>
        {/* On boucle sur le tableau "features" pour créer chaque carte */}
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
    </main>
  )
}

export default Home
