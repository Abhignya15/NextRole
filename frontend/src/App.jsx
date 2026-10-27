import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import routes from './router';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';
import AuthCallbackPage from './features/auth/pages/AuthCallbackPage';
import { supabase } from './services/supabase';

function AppShell() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const handleSignOut = async () => {
    if (!supabase) return;

    const { error } = await supabase.auth.signOut();

    if (!error) {
      setSession(null);
    }
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return undefined;
    }

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);

      // Defense-in-depth: strip any leftover OAuth query params (e.g. ?code=...)
      // from the address bar as soon as the session has been resolved, in case
      // supabase-js hasn't already cleaned it up.
      if (window.location.search) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const isAuthPage = ['/login', '/signup', '/auth/callback'].includes(location.pathname);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
        Loading...
      </div>
    );
  }

  if (!session && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  if (session && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  if (!session) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen md:ml-64">
        <Header user={session?.user} onSignOut={handleSignOut} />
        <div className="mx-auto max-w-6xl px-8 py-10">
          <Routes>
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
