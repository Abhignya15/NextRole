import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabase';

function AuthCallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!supabase) {
      navigate('/login', { replace: true });
      return;
    }

    const completeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('OAuth callback failed:', error);
        navigate('/login', { replace: true });
        return;
      }

      if (data?.session) {
        navigate('/', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    };

    completeAuth();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
      Completing sign in...
    </div>
  );
}

export default AuthCallbackPage;
