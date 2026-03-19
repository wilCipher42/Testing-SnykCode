/* 
Pour gerer la logique derrier le formulaire de connexion
*/

import LoginForm from "./LoginForm.jsx"
import { useState } from "react"


function LoginLogiq() {
  /* bon username et password par defaut pour tester et simuler */
  const bonPassword = "P@ssw0rd!";
  const bonUsername = "wilfried.james@example.com";

  // Gestion des états
  const [msg, setMsg] = useState("Veuillez vous connecter avec vos identifiants")
  const [hasError, setHasError] = useState(false)     // Verifier qu'il y a une erreur dans le formulaire
  const [errorEmail, setErrorEmail] = useState(false)   // Verifier que l'email est valide
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // fonction à executer quand on clique sur "Se connecter" pour la validation coté client
  function handleClick() {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(username)) {
      setMsg("Veuillez entrer une adresse courriel valide");
      setErrorEmail(true);
      return;
    }
    else
      setErrorEmail(false)

    if (username === bonUsername && password === bonPassword) {
      setMsg("Identifiants validé ! Yayyyy");
      setHasError(false);
    } else {
      setMsg("Adresse courriel ou mot de passe incorrect");
      setHasError(true);
    }
  }

  return (
    // On va donner les variables/etats comme props à LoginForm.jsx
    <LoginForm msg={msg} setMsg={setMsg} hasError={hasError} setHasError={setHasError} 
    username={username} setUsername={setUsername} password={password} setPassword={setPassword}
    handleClick={handleClick} errorEmail={errorEmail} setErrorEmail={setErrorEmail}/>
  );
}

export default LoginLogiq;
