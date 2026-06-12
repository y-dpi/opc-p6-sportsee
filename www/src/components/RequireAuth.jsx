// Dependencies.
import { Outlet, Navigate } from 'react-router-dom';
import { hasValidToken } from '../utils/auth.js';

// Route auth guard.
export default function RequireAuth() {

  // Redirect if no valid token.
  if (!hasValidToken())
    return <Navigate to='/login' replace />;

  // Render if valid token.
  return <Outlet />;
}
