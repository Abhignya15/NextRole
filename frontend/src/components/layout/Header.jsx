import Button from '../ui/Button';

function Header({ user, onSignOut }) {
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
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <h3 className="text-sm text-slate-500">Your next move starts here</h3>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
            {initials}
          </div>

          <div className="text-left">
            <p className="text-sm font-medium text-slate-800">{displayName}</p>
            <p className="text-[11px] text-slate-500">Signed in</p>
          </div>
        </div>

        <Button variant="secondary" onClick={onSignOut} type="button">
          Sign out
        </Button>
      </div>
    </header>
  );
}

export default Header;
