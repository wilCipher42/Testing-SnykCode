import { useState } from "react";
import { mockRequests as initialMockRequests } from "./../mockRequests";
import { useNavigate } from "react-router";
import RequestEditForm from "./RequestEditForm";


const MODES = {
  DASHBOARD: "dashboard",
  DETAIL: "detail",
  CREATE: "create",
  EDIT: "edit",
};

// U3.2 (UI): libellés lisibles pour l’affichage (n’affecte pas la logique)
const STATUS_LABELS = {
  SUBMITTED: "Soumise",
  COMPLETED: "Completée",
  CANCELED: "Rejetée",
  IN_PROGRESS: "En traitement",
};


function DashboardPage() {
  const [requests, setRequests] = useState(initialMockRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [mode, setMode] = useState(MODES.DASHBOARD);
  const navigate = useNavigate()

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleViewDetail = (request) => {
    setSelectedRequest(request);
    setMode(MODES.DETAIL);
  };

  const handleCreate = () => {
    setSelectedRequest(null);
    setMode(MODES.CREATE);
  };

  const handleEdit = (request) => {
    if (request.status === "SUBMITTED") {
      setSelectedRequest(request);
      setMode(MODES.EDIT);
    }
  };

  const handleBack = () => {
    setSelectedRequest(null);
    setMode(MODES.DASHBOARD);
  };

  /*
  const handleSaveCreate = (newRequest) => {
    const maxId = Math.max(...requests.map((r) => r.id), 0);
    const requestToAdd = {
      ...newRequest,
      id: maxId + 1,
      status: "SUBMITTED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRequests([...requests, requestToAdd]);
    setMode(MODES.DASHBOARD);
  };
*/
  const handleSaveEdit = (updatedRequest) => {
    setRequests(
      requests.map((r) =>
        r.id === updatedRequest.id
          ? { ...updatedRequest, updatedAt: new Date().toISOString() }
          : r
      )
    );
    setMode(MODES.DASHBOARD);
    setSelectedRequest(null);
  };

  // Stats dynamiques
  const countInProgress = requests.filter(
    (r) => r.status === "IN_PROGRESS",
  ).length;
  const countPending = requests.filter((r) => r.status === "SUBMITTED").length;
  const countCancel = requests.filter((r) => r.status === "CANCELED").length;
  const countDone = requests.filter((r) => r.status === "COMPLETED").length;

  //Dernières demandes (tri par updatedAt desc)
  const lastRequests = [...requests]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 20);

  // Vue Dashboard (nouveau UI)
  if (mode === MODES.DASHBOARD) {
    return (
      <div className="uqr-page">
        <article className="uqr-card uqr-cardWide">
          <div className="uqr-cardTop">
            <div className="uqr-cardTopRow">
              <div>
                <span className="uqr-chip uqr-chip-teal">Tableau de bord</span>
                <h2 className="uqr-cardTitle">Aperçu rapide</h2>
                <p className="uqr-cardText">
                  Vos demandes récentes et leurs statuts.
                </p>
              </div>

              <div className="uqr-topActions">
                <button
                  className="uqr-btn uqr-btn-primary"
                  type="button"
                  onClick={handleCreate}
                >
                  Créer une demande
                </button>
              </div>
            </div>

            <div className="uqr-stats">
              <div className="uqr-stat">
                <div className="uqr-statNum">{countInProgress}</div>
                <div className="uqr-statLbl">En cours</div>
              </div>
              <div className="uqr-stat">
                <div className="uqr-statNum">{countPending}</div>
                <div className="uqr-statLbl">En attente</div>
              </div>
              <div className="uqr-stat">
                <div className="uqr-statNum">{countDone}</div>
                <div className="uqr-statLbl">Traitées</div>
              </div>
              <div className="uqr-stat">
                <div className="uqr-statNum">{countCancel}</div>
                <div className="uqr-statLbl">Rejetées</div>
              </div>
            </div>
          </div>

          <div className="uqr-list">
            {requests.length === 0 ? (
              <div className="uqr-empty">Aucune demande pour le moment.</div>
            ) : (
              lastRequests.map((req) => {
                const statusLabel = STATUS_LABELS[req.status] ?? req.status;
                const titleLeft = `DEM-${String(req.id).padStart(3, "0")} • ${req.title}`;

                return (
                  <div className="uqr-row" key={req.id}>
                    <div className="uqr-rowLeft">
                      <div className="uqr-rowTitle">{titleLeft}</div>
                      <div className="uqr-rowMeta">
                        Dernière mise à jour : {formatDate(req.updatedAt)}
                      </div>
                    </div>

                    <div className="uqr-rowRight">
                      <span className={`demande-status status-${req.status}`}>
                        {statusLabel}
                      </span>

                      <div className="uqr-rowBtns">
                        <button
                          className="uqr-btn uqr-btn-ghost"
                          type="button"
                          onClick={() => handleViewDetail(req)}
                        >
                          Voir
                        </button>

                        <button
                          className="uqr-btn uqr-btn-warn"
                          type="button"
                          onClick={() => handleEdit(req)}
                          disabled={req.status !== "SUBMITTED"}
                          title={
                            req.status !== "SUBMITTED"
                              ? "Modification autorisée uniquement si le statut est SUBMITTED"
                              : "Modifier la demande"
                          }
                        >
                          Modifier
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/*}
          <div className="uqr-cardActions">
            <button
              className="uqr-btn uqr-btn-primary"
              type="button"
              onClick={() => {
              }}
            >
              Voir toutes mes demandes
            </button>
          </div>
          */}
        </article>
      </div>
    );
  }

  // Vue Detail
  if (mode === MODES.DETAIL && selectedRequest) {
    const demande = {
      id: `DEM-${String(selectedRequest.id).padStart(3, "0")}`,
      demandeur: selectedRequest.demandeur,
      telephone: selectedRequest.telephone,
      type: selectedRequest.type,
      titre: selectedRequest.title,
      description: selectedRequest.description || "Aucune description",
      statut: selectedRequest.status, 
      date: formatDate(selectedRequest.createdAt),
      commentaires: selectedRequest.commentaires || [], 
      updatedAt: formatDate(selectedRequest.updatedAt),
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
            <strong>Demandeur :</strong>
            <span className="demande-value">{demande.demandeur}</span>
          </p>

          <p>
            <strong>Téléphone :</strong>
            <span className="demande-value">{demande.telephone}</span>
          </p>

          <p>
            <strong>Type de demande:</strong>
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
            <span className={`demande-status status-${demande.statut}`}>
              {STATUS_LABELS[demande.statut] ?? demande.statut}
            </span>
          </p>

          <p>
            <strong>Date de soumission :</strong>
            <span className="demande-value">{demande.date}</span>
          </p>

          <p>
            <strong>Dernière modification :</strong>
            <span className="demande-value">{demande.updatedAt}</span>
          </p>

          <h3>Commentaires</h3>

          {demande.commentaires.length === 0 ? (
            <div className="uqr-empty">Aucun commentaire pour le moment.</div>
          ) : (
            <ul>
              {demande.commentaires.map((commentaire, index) => (
                <li key={index}>
                  <strong>{commentaire.auteur} :</strong> {commentaire.message}
                </li>
              ))}
            </ul>
          )}

          <button onClick={handleBack} aria-label="Retour au tableau de bord">
            Retour au tableau de bord
          </button>
        </div>
      </div>
    );
  }

  
  // Vue Create
  if (mode === MODES.CREATE) {
    return (
      navigate("/req-form")
      /*
      <RequestForm
        onSubmit={handleSaveCreate}
        onCancel={handleBack}
        mode="create"
      />
      */
    );
  }
/*
  // Vue Edit
  if (mode === MODES.EDIT && selectedRequest) {
    return (
      <RequestForm
        request={selectedRequest}
        onSubmit={handleSaveEdit}
        onCancel={handleBack}
        mode="edit"
      />
    );
  }

  return null;
  
}
  */

if (mode === MODES.EDIT && selectedRequest) {
  return (
    <RequestEditForm
      request={selectedRequest}
      onSubmit={handleSaveEdit}
      onCancel={handleBack}
      mode="edit"
    />
  );
}


/* // On n'a pas besoin de tout ça
vu qu'on aura une page pour les nouvelles demandes 
// Composant formulaire pour Create et Edit
function RequestForm({ request, onSubmit, onCancel, mode }) {
  const [formData, setFormData] = useState({
    title: request?.title || '',
    type: request?.type || '',
    description: request?.description || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'edit') {
      onSubmit({ ...request, ...formData });
    } else {
      onSubmit(formData);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>{mode === 'edit' ? 'Modifier la demande' : 'Créer une nouvelle demande'}</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Titre :
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              maxWidth: '500px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Type :
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              maxWidth: '500px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Description :
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              maxWidth: '500px'
            }}
          />
        </div>

        <div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              marginRight: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {mode === 'edit' ? 'Enregistrer' : 'Créer'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#757575',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
  */
}

export default DashboardPage;
