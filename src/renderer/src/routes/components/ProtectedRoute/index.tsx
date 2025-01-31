import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth';

export const ProtectedRoute: React.FC = () => {
  const { token } = useAuth();

  return token !== '' ? <Outlet /> : <Navigate to="/login" replace />;
};
