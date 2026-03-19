import React from "react";
import { useNavigate } from "react-router-dom";

const DemandeDetail = () => {
  const navigate = useNavigate();

  // Données simulées (aucune base de données)
  const demande = {
    id: "DEM-001",
    type: "RH",
    titre: "Demande de congé",
    description: "Congé annuel pour le mois d’août",
    statut: "IN_PROGRESS",
    date: "2026-01-15",
    commentaires: [
      {
        auteur: "Utilisateur",
        message: "Merci de traiter ma demande.",
      },
      {
        auteur: "Gestionnaire",
        message: "La demande est actuellement en cours d’analyse.",
      },
    ],
  };

  return (
    <div className="demande-page">
      <div className="demande-detail">
        <h2>Détails de la demande</h2>

        <p>
          <strong>ID :</strong> 
          <span className="demande-value">{demande.id}</span>
        </p>
        <p>
          <strong>Type :</strong>
          <span className="demande-value">{demande.type}</span> 
        </p>
        <p>
          <strong>Titre :</strong>
          <span className="demande-value">{demande.titre}</span> 
        </p>
        <p>
          <strong>Description :</strong> 
          <span className="demande-value">{demande.description}</span>
        </p>
        <p>
          <strong>Statut :</strong> 
          {/* Pour surligner les status */}
          <span className={`demande-status status-${demande.statut}`}>
            {demande.statut}
          </span>
        </p>
        <p>
          <strong>Date de soumission :</strong>
          <span className="demande-value">{demande.date}</span> 
        </p>

        <h3>Commentaires</h3>
        <ul>
          {demande.commentaires.map((commentaire, index) => (
            <li key={index}>
              <strong>{commentaire.auteur} :</strong> {commentaire.message}
            </li>
          ))}
        </ul>

        <button
          onClick={() => navigate("/dashboard")}
          aria-label="Retour au tableau de bord"
        >
          Retour au tableau de bord
        </button>
      </div>
    </div>
  );
};

export default DemandeDetail;
