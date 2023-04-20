import { Navigate } from 'react-router-dom';

interface props {
  children: JSX.Element,
  isAuthenticated: Boolean,
}

function ProtectedRoute ({ isAuthenticated, children }: props): JSX.Element {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
