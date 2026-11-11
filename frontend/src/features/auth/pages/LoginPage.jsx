import { useState } from 'react';
import hero from '../../../assets/hero.png';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { authService } from '../../../services/authService';

const features = [
  {
    icon: '🎯',
    title: 'Interview prep',
    description: 'Mock questions and a study plan built around the role and company you want.',
  },
  {
    icon: '📚',
    title: 'Course prep',
    description: 'Stay on top of coursework with a plan that adapts to your schedule.',
  },
  {
    icon: '🏆',
    title: 'Certification prep',
    description: 'Break down exam topics and track your confidence as you go.',
  },
];

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.2-.1-2.3-.4-3.5Z"
    />
    <path
      fill="#FF3D00"
      d="m6.3 14.7 6.6 4.8C14.6 15.5 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 7.1 29.6 5 24 5c-7.6 0-14.1 4.3-17.7 10.7Z"
    />
    <path
      fill="#4CAF50"
      d="M24 45c5.5 0 10.4-2.1 14.2-5.5l-6.6-5.6C29.5 35.6 26.9 36.5 24 36.5c-5.3 0-9.7-2.6-11.3-7l-6.6 5.1C9.8 40.6 16.3 45 24 45Z"
    />
    <path
      fill="#1976D2"
      d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.6 5.6c-.4.4 7.2-5.3 7.2-15.6 0-1.2-.1-2.3-.4-3.5Z"
    />
  </svg>
);

function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      await authService.loginWithGoogle();
    } catch (submitError) {
      setError(submitError?.message || 'Google sign in failed.');
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-slate-50 lg:grid-cols-2">
      <div className="relative order-2 flex flex-col justify-center gap-6 overflow-hidden bg-slate-900 px-6 py-10 text-white sm:gap-8 lg:order-1 lg:px-12 lg:py-16">
        <div
          className="animate-blob-glow absolute -left-16 -top-16 h-72 w-72 rounded-full bg-indigo-600/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="animate-blob-glow absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl"
          style={{ animationDelay: '-5s' }}
          aria-hidden="true"
        />
        <div
          className="animate-blob-glow absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"
          style={{ animationDelay: '-9s' }}
          aria-hidden="true"
        />

        <img src={hero} alt="" className="animate-float relative h-24 w-24 drop-shadow-2xl sm:h-32 sm:w-32" />

        <div className="relative">
          <Badge className="bg-indigo-500/10 text-indigo-300">YOUR NEXT CHAPTER</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            Welcome to NextRole 👋
          </h1>
          <p className="mt-2 text-base font-medium text-indigo-200">
            Your AI-powered career preparation platform.
          </p>
          <p className="mt-3 max-w-md leading-relaxed text-slate-300">
            Your next career move starts here. Whether you are prepping for
            interviews, coursework, or a certification exam, get a plan built
            around what you are actually working toward.
          </p>
        </div>

        <div className="relative hidden gap-3 sm:grid">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in-up flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              style={{ animationDelay: `${0.15 + index * 0.15}s` }}
            >
              <span className="text-2xl" aria-hidden="true">
                {feature.icon}
              </span>
              <div>
                <p className="font-semibold text-white">{feature.title}</p>
                <p className="mt-1 text-sm text-slate-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative order-1 flex items-center justify-center overflow-hidden px-4 py-10 lg:order-2 lg:py-16">
        <div
          className="animate-blob-glow absolute -right-24 top-0 h-96 w-96 rounded-full bg-indigo-300/50 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="animate-blob-glow absolute bottom-0 left-0 h-80 w-80 rounded-full bg-fuchsia-200/50 blur-3xl"
          style={{ animationDelay: '-6s' }}
          aria-hidden="true"
        />

        <div className="animate-fade-in-up relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white/90 p-10 shadow-xl shadow-indigo-900/5 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <img src={hero} alt="" className="h-10 w-10" />
            <span className="text-base font-semibold tracking-tight text-slate-900">NextRole</span>
          </div>

          <h2 className="mt-8 text-3xl font-bold text-slate-900">Sign in to NextRole</h2>
          <p className="mt-3 text-base text-slate-500">
            Continue with Google to get started.
          </p>

          {error ? (
            <div
              className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              <p className="font-semibold">Unable to sign in</p>
              <p className="mt-1">{error}</p>
            </div>
          ) : null}

          <Button
            variant="secondary"
            type="button"
            className="mt-8 flex w-full items-center justify-center gap-3 py-3.5 text-base font-medium shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <GoogleIcon />
            {loading ? 'Signing in...' : 'Continue with Google'}
          </Button>

          <p className="mt-6 text-center text-xs text-slate-400">
            New here? Signing in with Google creates your account automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

