import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Spinner } from '@/components/ui';
import { AuthProvider, useAuth } from './AuthContext';
import AdminLayout from './AdminLayout';
import Login from './Login';

const Overview = lazy(() => import('./pages/Overview'));
const Leads = lazy(() => import('./pages/Leads'));
const Applications = lazy(() => import('./pages/Applications'));
const Subscribers = lazy(() => import('./pages/Subscribers'));
const Posts = lazy(() => import('./pages/Posts'));
const Team = lazy(() => import('./pages/Team'));

function Booting() {
  return (
    <div className="grid min-h-screen place-items-center bg-canvas">
      <Spinner className="h-7 w-7 text-brand" />
    </div>
  );
}

/** Renders the console when authenticated, the sign-in screen when not. */
function Gate() {
  const { user, checking } = useAuth();

  // Block on the boot-time token check so a signed-in operator never sees the
  // login screen flash before their session is confirmed.
  if (checking) return <Booting />;
  if (!user) return <Login />;

  return (
    <Suspense fallback={<Booting />}>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="leads" element={<Leads />} />
          <Route path="applications" element={<Applications />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="posts" element={<Posts />} />
          <Route path="team" element={<Team />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
