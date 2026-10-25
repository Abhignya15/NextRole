import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { authService } from '../../../services/authService';

function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.signup(form);
      navigate('/');
    } catch (submitError) {
      setError(submitError?.message || 'Unable to create account right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError('');
    setLoading(true);

    try {
      await authService.loginWithGoogle();
    } catch (submitError) {
      setError(submitError?.message || 'Google sign up failed.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
        <p className="mt-2 text-sm text-slate-500">Start your next chapter.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input type="text" placeholder="Full name" value={form.fullName} onChange={handleChange('fullName')} required />
          <Input type="email" placeholder="Email" value={form.email} onChange={handleChange('email')} required />
          <Input type="password" placeholder="Password" value={form.password} onChange={handleChange('password')} required />
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              <p className="font-semibold">Unable to create account</p>
              <p className="mt-1">{error}</p>
            </div>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign up'}
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs uppercase tracking-[0.12em] text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <Button variant="secondary" type="button" className="w-full" onClick={handleGoogleSignUp} disabled={loading}>
          Continue with Google
        </Button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
