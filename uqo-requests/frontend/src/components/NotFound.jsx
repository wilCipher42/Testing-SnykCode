import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="nf-page">
      <article className="nf-card">
        <span className="nf-chip">Erreur</span>

        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Page introuvable</h2>

        <p className="nf-text">
          La page que vous recherchez n’existe pas ou n’est plus disponible.
        </p>

        <div className="nf-actions">
          <button className="nf-btn nf-btn--primary" onClick={() => navigate("/")}>
            Retour à l’accueil
          </button>

        </div>

        <p className="nf-hint">
          Astuce : vérifiez l’URL ou utilisez le menu pour revenir au tableau de bord.
        </p>
      </article>
    </section>
  );
};

export default NotFound;
