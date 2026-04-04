// ============================================================
// Profile.jsx - Page profil de l'utilisateur connecté
// Affiche le message de bienvenue, le formulaire d'édition
// du username, et les comptes bancaires.
// ============================================================

// useState : pour gérer l'état local (formulaire ouvert/fermé, valeur du champ)
// useEffect : pour exécuter du code quand le composant s'affiche
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// On importe les actions dont on a besoin
import { fetchUserProfile, updateUserName } from '../store/userSlice'
// Composant réutilisable pour afficher un compte
import AccountCard from '../components/AccountCard'

function Profile() {
  // ----- DONNÉES REDUX -----

  // On récupère le token et les infos utilisateur depuis le store
  const token = useSelector((state) => state.user.token)
  const user = useSelector((state) => state.user.user)

  const dispatch = useDispatch()

  // ----- STATE LOCAL -----

  // Est-ce que le formulaire d'édition est ouvert ?
  const [isEditing, setIsEditing] = useState(false)
  // La valeur du champ "userName" dans le formulaire
  // On initialise directement avec la valeur du store Redux
  // (pas besoin d'un useEffect pour synchroniser)
  const [newUserName, setNewUserName] = useState(user.userName || '')

  // ----- EFFET : CHARGER LE PROFIL AU MONTAGE -----

  // useEffect s'exécute quand le composant apparaît à l'écran
  // On l'utilise pour aller chercher les infos du profil via l'API
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile(token))
    }
  }, [dispatch, token])

  // ----- GESTION DU FORMULAIRE D'ÉDITION -----

  // Quand on clique sur "Edit Name"
  const handleEditClick = () => {
    setIsEditing(true)
    setNewUserName(user.userName || '')
  }

  // Quand on clique sur "Cancel"
  const handleCancel = () => {
    setIsEditing(false)
    // On remet la valeur d'origine
    setNewUserName(user.userName || '')
  }

  // Quand on clique sur "Save"
  const handleSave = async () => {
    // On envoie l'action pour mettre à jour le userName via l'API
    await dispatch(updateUserName({ token, userName: newUserName }))
    // On ferme le formulaire
    setIsEditing(false)
  }

  // ----- DONNÉES DES COMPTES (en dur, car l'API ne les fournit pas) -----

  const accounts = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      description: 'Available Balance',
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      description: 'Current Balance',
    },
  ]

  return (
    <main className="main bg-dark">
      {/* En-tête avec le message de bienvenue */}
      <div className="header">
        {/* Si le formulaire d'édition est fermé, on affiche le nom + bouton Edit */}
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName}!
            </h1>
            <button className="edit-button" onClick={handleEditClick}>
              Edit Name
            </button>
          </>
        ) : (
          // Si le formulaire est ouvert, on affiche les champs d'édition
          <>
            <h1>Edit user info</h1>
            <div className="edit-form">
              <div className="edit-form-inputs">
                {/* Champ User name : ÉDITABLE */}
                <div className="input-wrapper">
                  <label htmlFor="userName">User name:</label>
                  <input
                    type="text"
                    id="userName"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                  />
                </div>
                {/* Champ First name : EN LECTURE SEULE (disabled) */}
                <div className="input-wrapper">
                  <label htmlFor="firstName">First name:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={user.firstName || ''}
                    disabled
                  />
                </div>
                {/* Champ Last name : EN LECTURE SEULE (disabled) */}
                <div className="input-wrapper">
                  <label htmlFor="lastName">Last name:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={user.lastName || ''}
                    disabled
                  />
                </div>
              </div>
              {/* Boutons Save et Cancel */}
              <div className="edit-form-buttons">
                <button className="save-button" onClick={handleSave}>
                  Save
                </button>
                <button className="cancel-button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Liste des comptes bancaires */}
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <AccountCard
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  )
}

export default Profile
