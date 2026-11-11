import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import routes from './router';
import LoginPage from './features/auth/pages/LoginPage';
import AuthCallbackPage from './features/auth/pages/AuthCallbackPage';
import { supabase, pendingOAuthCode } from './services/supabase';

function AppShell() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
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
      if (pendingOAuthCode) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(pendingOAuthCode);

        if (error) {
          console.error('OAuth code exchange failed:', error);
        }

        setSession(data?.session ?? null);
      } else {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
      }

      setLoading(false);

      // Defense-in-depth: strip any other leftover OAuth query params (e.g.
      // ?error=...) from the address bar once session handling is done.
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

  const isAuthPage = ['/login', '/auth/callback'].includes(location.pathname);

  useEffect(() => {
    setIsNavOpen(false);
  }, [location.pathname]);

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
        <Route path="/auth/callback" element={<AuthCallbackPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <main className="min-h-screen md:ml-64">
        <Header
          user={session?.user}
          onSignOut={handleSignOut}
          onMenuClick={() => setIsNavOpen(true)}
        />
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
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
