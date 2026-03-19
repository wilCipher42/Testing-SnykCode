import { useState } from "react";
//import "./Register.css";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [hasError, setHasError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("")

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name && !form.email && !form.password && !form.confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      setHasError(true);
      return;
    }
    else{
      setError("")
      setHasError(false)
    }

    if (!form.name){
      setError("Entrez votre nom complet");
      setErrorName(true);
      return;
    }
    else{
      setError("")
      setErrorName(false)
    }

    if (!form.email || !form.email.includes("@")) {
      setError("Adresse courriel invalide.");
      setErrorEmail(true)
      return;
    }
    else{
      setError("");
      setErrorEmail(false)
      
    }

    if(!form.password || !form.confirmPassword){
      setError("Mot de passe invalide ou la confirmation est vide");
      return;
    }
    else
      setError("")

    /*
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      setHasError(true);
      return;
    }
    else
      setHasError(false)
    */

    
    /*
    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
  */
    setError("");
    alert("Inscription simulée avec succès.");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Inscription</h2>

        {error && <p className="login-subtitle">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom complet</label>
            <input
              name="name"
              placeholder="ex. John Doe"
              value={form.name}
              onChange={handleChange}
              className={(hasError || errorName) ? "input-error" : ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse couriel</label>
            <input
              name="email"
              placeholder="Courriel"
              value={form.email}
              onChange={handleChange}
              className={(hasError || errorEmail) ? "input-error" : ""}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              className={(hasError || error) ? "input-error" : ""}
              onChange={(e) => {
                const userInput = e.target.value
                
                setForm({ ...form, password: userInput });

                var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
                if(!passRegex.test(userInput) || userInput===""){
                  setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.");
                } else {
                  setPasswordError("");
                }
              }}
            />
            {passwordError && (
              <small className="error-text">{passwordError}</small>
              )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={form.confirmPassword}
              onChange={(e) => {
                const userInput = e.target.value
                
                setForm({ ...form, confirmPassword: userInput });

                const pass = form.password
                if(userInput!=pass){
                  setConfirmError("Les mots de passes ne matchent pas")
                }
                else
                  setConfirmError("")
              }}
              className={(hasError || error) ? "input-error" : ""}
            />
            {confirmError && (
              <small className="error-text">{confirmError}</small>
              )}
          </div>

          <button className="login-btn" type="submit">
            S’inscrire
          </button>

          <div className="login-actions">
            <Link to="/login">Déjà un compte ?</Link>
          </div>

        </form>
      </div>
    </div>
  );

}

export default Register;
