import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3005/store/login", credentials);

      if (response.data.status === "success") {
        login(); // Actualiza el estado de autenticación
      } else {
        setError(response.data.message || "Error desconocido");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Usuario o contraseña incorrectos");
      } else {
        setError("Error al conectar con el servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
