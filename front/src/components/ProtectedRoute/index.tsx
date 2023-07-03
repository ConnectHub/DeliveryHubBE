import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouterProps {
  children: React.ReactNode;
}

function ProtectedRouter({ children }: ProtectedRouterProps) {
  const { user } = useContext(AuthContext);

  if (user.authToken) return <>{children}</>;
  if (user.authToken === '') return <Navigate to="/login" />;
  return null;
}

export default ProtectedRouter;
