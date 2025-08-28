import { Link } from "react-router-dom";
import "../styles/components/Login1.scss";
import { useNavigate } from "react-router-dom";

function Login1({
  nombreAsociacion,
  setNombreAsociacion,
  contraseña,
  setContraseña,
}) {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem("nombreAsociacion", nombreAsociacion);
    localStorage.setItem("contraseña", contraseña);
    navigate("/dashboard");
  }
  return (
    <>
      <div className="login-container">
        <img src="/logo.png" alt="AnimalTrack logo" className="logo" />

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="asociacion">Nombre asociación:</label>
          <input
            id="asociacion"
            type="text"
            className="input-field"
            value={nombreAsociacion}
            onChange={(ev) => setNombreAsociacion(ev.target.value)}
          />

          <label htmlFor="contraseña">Contraseña:</label>
          <input
            id="contraseña"
            type="password"
            className="input-field"
            value={contraseña}
            onChange={(ev) => setContraseña(ev.target.value)}
          />

          <button type="submit" className="submit-btn">
            Entrar
          </button>
          <p className="login-link">
            <Link to="#">¿Has olvidado tu contraseña?</Link>
            <Link to="#">Crea tu cuenta</Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login1;
