import { Link } from "react-router-dom";

function LoginForm({msg, hasError,
  username, setUsername, password, setPassword, handleClick,
  errorEmail
}) 
{
  function handleSubmit(e){
      e.preventDefault()
      
      handleClick()
    }

  return (

    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Connexion</h2>
        <p className="login-subtitle">
          {msg}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Adresse courriel</label>
            <input type="text" id="email" name="email" 
            value={username} onChange={(e) => setUsername(e.target.value)}
            className={(hasError || errorEmail) ? "input-error" : ""}/>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" 
            value={password} onChange={(e) => setPassword(e.target.value)}
            className={hasError ? "input-error" : ""}/>
          </div>

          <button className="login-btn" type="submit">
            Se connecter
          </button>

          <div className="login-actions">
            <Link to="/register">Créer un compte</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
