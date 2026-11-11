import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Profile', path: '/profile' },
  { label: 'Interview Prep', path: '/prep' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Applications', path: '/applications' },
  { label: 'Interviews', path: '/interviews' },
];

function Sidebar({ isOpen = false, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white p-6 transition-transform duration-200 ease-out md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-10">
          <p className="text-xl font-bold tracking-tight text-slate-900">NextRole</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(`${item.path}/`));

            return (
              <button
                key={item.label}
                className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                type="button"
                onClick={() => handleNavigate(item.path)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
