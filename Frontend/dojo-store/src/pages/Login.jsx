import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Login.css";
import Swal from "sweetalert2";
const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  // Redirige al Dashboard si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3005/store/login",
        credentials
      );

      if (response.data.status === "success") {
        Swal.fire("Éxito", "Bienvenido", "success");
        login();
      } else {
        setError(response.data.message || "Error desconocido");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Error de autenticación
        //  setError(err.response.data.message || "");
        Swal.fire("Error", "Usuario o contraseña incorrectos", "error");

      } else {
        // Error de conexión o servidor
        setError("Error al conectar con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Iniciar Sesión</h2>
        {error && <p className="login-error">{error}</p>}
        <div className="login-field">
          <label>Usuario:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Ingresa tu usuario"
            required
          />
        </div>
        <div className="login-field">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;
