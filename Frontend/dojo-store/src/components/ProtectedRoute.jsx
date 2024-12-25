import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

// Validación de las propiedades con PropTypes
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Valida que children sea un nodo React
};

export default ProtectedRoute;
