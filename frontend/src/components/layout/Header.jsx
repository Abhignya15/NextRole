import Button from '../ui/Button';

function Header({ user, onSignOut, onMenuClick }) {
  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Profile';

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('') || 'P';

  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          className="-ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50 md:hidden"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h3 className="truncate text-sm text-slate-500">Your next move starts here</h3>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 sm:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
            {initials}
          </div>

          <div className="text-left">
            <p className="text-sm font-medium text-slate-800">{displayName}</p>
            <p className="text-[11px] text-slate-500">Signed in</p>
          </div>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 sm:hidden">
          {initials}
        </div>

        <Button variant="secondary" onClick={onSignOut} type="button">
          Sign out
        </Button>
      </div>
    </header>
  );
}

export default Header;
