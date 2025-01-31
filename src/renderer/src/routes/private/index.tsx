/* ---------- External ---------- */
import { Navigate, type RouteObject } from 'react-router-dom';

/* ---------- Components ---------- */
import { Error } from '../../pages/Error';
import { Home } from '../../pages/Home';
import { ProtectedRoute } from '../components/ProtectedRoute';

/* ---------- Constants ---------- */
const private_routes_array: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <Home />, errorElement: <Error /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

export const private_routes = (): RouteObject => {
  return {
    children: private_routes_array,
  };
};
