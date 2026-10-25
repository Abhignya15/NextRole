import Button from '../ui/Button';

function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <h3 className="text-sm text-slate-500"> Your next move starts here</h3>

      <Button variant="secondary">My Profile</Button>
    </header>
  );
}

export default Header;
