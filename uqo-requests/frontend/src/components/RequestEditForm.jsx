import { useEffect, useState } from "react";
import sq_req from "./../assets/sq_req.png";

function RequestEditForm({ request, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    demandeur: "",
    telephone: "",
    titre: "",
    type: "",
    description: "",
    dateSouhaitee: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [telError, setTelError] = useState("");

  // Pré-remplir à partir de request
  useEffect(() => {
    if (!request) return;

    setForm({
      demandeur: request.demandeur || "",
      telephone: request.telephone || "",
      titre: request.title || request.titre || "",
      type: request.type || "",
      description: request.description || "",
      dateSouhaitee: request.dateSouhaitee || "",
    });

    setError("");
    setSuccess("");
    setTelError("");
  }, [request]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleTelephoneChange = (e) => {
    const userInput = e.target.value;
    setForm((prev) => ({ ...prev, telephone: userInput }));
    setError("");
    setSuccess("");

    const telRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (userInput && !telRegex.test(userInput)) {
      setTelError("Format invalide. Exemple: 819-555-1234");
    } else {
      setTelError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Champs obligatoires
    if (!form.nomComplet || !form.titre || !form.type || !form.description) {
      setError("Veuillez remplir tous les champs obligatoires (*).");
      setSuccess("");
      return;
    }

    // Validation téléphone (si tu veux le rendre obligatoire, enlève le "if")
    if (form.telephone && telError) {
      setError("Veuillez corriger le numéro de téléphone.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Demande modifiée avec succès (simulation).");

    // Conversion vers le modèle utilisé par le dashboard
    const updatedRequest = {
      ...request,
      demandeur: form.demandeur,
      telephone: form.telephone,
      title: form.titre, // dashboard -> title
      type: form.type,
      description: form.description,
      dateSouhaitee: form.dateSouhaitee,
    };

    onSubmit(updatedRequest);
  };

  return (
    <section className="rq-page">
      <article className="rq-card">
        <header className="rq-head">
          <span className="rq-chip">Modification</span>
          <h2 className="rq-title">Modifier une demande</h2>
          <img src={sq_req} alt="service request" />
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
              value={form.demandeur}
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
              onChange={handleTelephoneChange}
            />
            {telError && <small className="error-text">{telError}</small>}
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

          <div className="rq-actions" style={{ display: "flex", gap: "10px" }}>
            <button className="rq-btn rq-btn--primary" type="submit">
              Enregistrer
            </button>

            <button
              className="rq-btn"
              type="button"
              onClick={onCancel}
              aria-label="Annuler la modification"
            >
              Annuler
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

export default RequestEditForm;
