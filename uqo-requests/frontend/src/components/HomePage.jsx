import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="uqr-page">
      
      <section className="uqr-intro">
        <div className="uqr-introCard">
          <h1 className="uqr-introTitle">Bienvenue au site Uqo-Request du Groupe 11</h1>

          <p className="uqr-introText">
            Ce site est créé dans le cadre du cours <strong>INF1743-01</strong> pour permettre aux étudiants de{" "}
            <strong>soumettre une nouvelle demande</strong> ou de <strong>gérer une demande existante</strong>.{" "}
            <br></br><br></br>
            Pour le fun, voici les membres de l'equipe 11: <strong>Wilfried Ahuelie, Youcef Guedoauri, Annie Christelle,
              Valerie Makouet, Abidé, Jean Pierre Meto, Kevin, Zin-Eddine
            </strong>
          </p>    

        </div>
      </section>

      <main className="uqr-main">
        <section className="uqr-grid uqr-gridSimple">
          <article className="uqr-card">
            <div className="uqr-cardTop">
              <span className="uqr-chip uqr-chip-teal">Créer</span>
              <h2 className="uqr-cardTitle">Nouvelle demande</h2>
              <p className="uqr-cardText">
                Démarrez une demande (congé, accès, matériel, etc.) et soumettez-la.
              </p>
            </div>
            <div className="uqr-cardActions">
              <Link to="/req-form">
               <button className="uqr-btn uqr-btn-primary">Créer</button>
              </Link>
            </div>
          </article>

          <article className="uqr-card">
            <div className="uqr-cardTop">
              <span className="uqr-chip uqr-chip-rose">Suivi</span>
              <h2 className="uqr-cardTitle">Suivre une demande</h2>
              <p className="uqr-cardText">
                Consultez le statut, les commentaires et l’historique de traitement.
              </p>
            </div>
            <div className="uqr-cardActions">
              <Link to="/dashboard">
                <button className="uqr-btn uqr-btn-primary" type="button">Consulter</button>
              </Link>
            </div>
          </article>

          <article className="uqr-card">
            <div className="uqr-cardTop">
              <span className="uqr-chip uqr-chip-burg">Modifier</span>
              <h2 className="uqr-cardTitle">Modifier / compléter</h2>
              <p className="uqr-cardText">
                Mettez à jour une demande (infos manquantes, pièces jointes, corrections).
              </p>
            </div>
            <div className="uqr-cardActions">
              <Link to="/dashboard">
                <button className="uqr-btn uqr-btn-primary" type="button">Modifier</button>
              </Link>
            </div>
          </article>
        </section>
      </main>

    </div>
  );
}
