export function getApiErrorMessage(status) {
  if (status === 401) {
    return "Vous devez être connecté pour accéder à cette ressource.";
  }

  if (status === 403) {
    return "Accès refusé : vous n'avez pas la permission.";
  }

  return "Une erreur est survenue.";
}