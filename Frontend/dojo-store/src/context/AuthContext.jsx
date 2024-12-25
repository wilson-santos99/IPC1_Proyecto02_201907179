import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const login = () => {
    setIsAuthenticated(true);
    navigate("/dashboard"); // Redirige al Dashboard después de iniciar sesión
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/"); // Redirige al Login después de cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Agrega la validación de las propiedades
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired, // Valida que children sea un nodo React
};

export const useAuth = () => useContext(AuthContext);
