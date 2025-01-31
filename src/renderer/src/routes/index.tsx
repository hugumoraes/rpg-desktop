/* ---------- External ---------- */
import { createBrowserRouter } from 'react-router-dom';

/* ---------- Components ---------- */
import { private_routes } from './private';
import { public_routes } from './public';

const router = createBrowserRouter([private_routes(), public_routes()]);

export { router };
