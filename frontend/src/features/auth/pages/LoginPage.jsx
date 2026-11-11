import { useState } from 'react';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { authService } from '../../../services/authService';

const features = [
  {
    title: 'Interview Preparation',
    description: 'Practise role-specific questions and improve with personalised feedback.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: 'Learning & Coursework',
    description: 'Turn your learning goals into structured, manageable plans.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M4 5.5A2 2 0 0 1 6 3.5h5.5v17H6a2 2 0 0 1-2-2Z" />
        <path d="M20 5.5a2 2 0 0 0-2-2h-5.5v17H18a2 2 0 0 0 2-2Z" />
      </svg>
    ),
  },
  {
    title: 'Certification Preparation',
    description: 'Break down exam topics, track progress and build confidence.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <circle cx="12" cy="8.5" r="4.5" />
        <path d="M8.8 12.4 7.2 20l4.8-2.6 4.8 2.6-1.6-7.6" />
      </svg>
    ),
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

const Logo = ({ className = 'h-9 w-9 text-base' }) => (
  <span
    className={`flex items-center justify-center rounded-lg bg-violet-700 font-bold text-white ${className}`}
    aria-hidden="true"
  >
    N
  </span>
);

function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (loading) return;

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
    <div className="grid min-h-screen bg-[#F8FAFC] lg:grid-cols-2">
      <div className="relative order-2 flex flex-col justify-center gap-6 overflow-hidden bg-[#10172A] px-6 py-10 text-white sm:gap-8 lg:order-1 lg:gap-10 lg:px-14 lg:py-16">
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex items-center gap-3">
          <Logo />
          <span className="text-lg font-semibold tracking-tight">NextRole</span>
        </div>

        <div className="relative">
          <Badge className="bg-violet-500/10 text-violet-300">YOUR NEXT CHAPTER</Badge>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white lg:text-[28px]">
            Welcome to NextRole.
          </h1>
          <p className="mt-2 text-base font-medium text-slate-300">
            Your career. Your goals. Your preparation.
          </p>
          <p className="mt-4 max-w-md text-sm leading-[1.6] text-slate-400">
            Preparing for interviews, placements or certifications shouldn&apos;t
            feel overwhelming. NextRole brings your preparation together with
            personalised study plans, AI-powered practice and actionable
            feedback.
          </p>
        </div>

        <div className="relative grid gap-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-violet-400/30"
            >
              <span className="mt-0.5 text-violet-400" aria-hidden="true">
                {feature.icon}
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{feature.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative order-1 flex items-center justify-center overflow-hidden px-4 py-12 lg:order-2 lg:py-16">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl"
          aria-hidden="true"
        />

        <div className="animate-fade-in-up relative w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8 text-sm" />
            <span className="text-sm font-semibold tracking-tight text-[#111827]">NextRole</span>
          </div>

          <h2 className="mt-7 text-2xl font-bold text-[#111827]">Sign in to NextRole</h2>
          <p className="mt-2 text-sm text-slate-600">
            Continue with Google to get started.
          </p>

          {error ? (
            <div
              className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              <p className="font-semibold">Unable to sign in</p>
              <p className="mt-1">{error}</p>
            </div>
          ) : null}

          <Button
            variant="secondary"
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-3 border-[#E2E8F0] bg-white py-3 text-sm font-medium transition duration-200 ease-out hover:!border-[#8B5CF6] hover:!bg-[#FAF8FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]/60"
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

