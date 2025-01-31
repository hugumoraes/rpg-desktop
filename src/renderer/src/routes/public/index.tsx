/* ---------- External ---------- */
import { Navigate, type RouteObject } from 'react-router-dom';

/* ---------- Components ---------- */
import { Error } from '../../pages/Error';
import { Login } from '../../pages/Login';

/* ---------- Constants ---------- */
const public_routes_array: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  },
  { path: '*', element: <Navigate to="/login" replace /> },
];

export const public_routes = (): RouteObject => {
  return {
    children: public_routes_array,
  };
};
