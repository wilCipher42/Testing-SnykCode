import { useState } from "react";
import sq_req from "./../assets/sq_req.png"

function CreationFormulaire() {
  const [form, setForm] = useState({
    nomComplet: "",
    telephone: "",
    titre: "",
    type: "",
    description: "",
    dateSouhaitee: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [telError, setTelError] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nomComplet || !form.titre || !form.type || !form.description) {
      setError("Veuillez remplir tous les champs obligatoires (*).");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Demande envoyée avec succès (simulation).");
    console.log("Demande simulée:", form);
  };

  return (
    <section className="rq-page">
      <article className="rq-card">
        <header className="rq-head">
          <span className="rq-chip">Nouvelle demande</span>
          <h2 className="rq-title">Créer une demande</h2>
          <img src={sq_req} alt="service request"></img>
          <p className="rq-subtitle">
            Veuillez remplir tous les champs obligatoires (<strong>*</strong>).
          </p>
        </header>

        {error && <div className="rq-alert rq-alert--error">{error}</div>}
        {success && <div className="rq-alert rq-alert--success">{success}</div>}

        <form className="rq-form" onSubmit={handleSubmit} noValidate>
          <div className="rq-field">
            <label className="rq-label">
              Demandeur <span className="rq-req">*</span>
            </label>
            <input
              className="rq-input"
              name="nomComplet"
              placeholder="Ex: Jean Tremblay"
              value={form.nomComplet}
              onChange={handleChange}
              required
            />
          </div>

          <div className="rq-field">
            <label className="rq-label">
              Téléphone <span className="rq-req">*</span>
            </label>
            <input
              className="rq-input"
              name="telephone"
              placeholder="Ex: 819-555-1234"
              value={form.telephone}
              onChange={(e) => {
                const userInput = e.target.value
                
                setForm({ ...form, telephone: userInput });

                var telRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
                if(!telRegex.test(userInput)){
                  setTelError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.");
                } else {
                  setTelError("");
                }
              }}
            />
            {telError && (
              <small className="error-text">{telError}</small>
              )}
            
          </div>

          <div className="rq-field">
            <label className="rq-label">
              Type de demande <span className="rq-req">*</span>
            </label>
            <select
              className="rq-select"
              name="type"
              value={form.type}
              onChange={handleChange}
              required
            >
              <option value="">Choisir un type…</option>
              <option value="informatique">Informatique</option>
              <option value="rh">Ressources Humaines</option>
              <option value="maintenance">Maintenance</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div className="rq-field">
            <label className="rq-label">
              Titre de la demande <span className="rq-req">*</span>
            </label>
            <input
              className="rq-input"
              name="titre"
              placeholder="Ex: Accès application"
              value={form.titre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="rq-field">
            <label className="rq-label">
              Description <span className="rq-req">*</span>
            </label>
            <textarea
              className="rq-textarea"
              name="description"
              placeholder="Décrivez votre demande…"
              rows={6}
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="rq-field">
            <label className="rq-label">Date souhaitée de traitement</label>
            <input
              className="rq-input"
              type="date"
              name="dateSouhaitee"
              value={form.dateSouhaitee}
              onChange={handleChange}
            />
          </div>

          <div className="rq-actions">
            <button className="rq-btn rq-btn--primary" type="submit">
              Envoyer la demande
            </button>
          </div>

          <p className="rq-footnote">
            <span className="rq-req">*</span> Champs obligatoires
          </p>
        </form>
      </article>
    </section>
  );
}

export default CreationFormulaire;
