import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Profile', path: '/profile' },
  { label: 'Interview Prep', path: '/prep' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Applications', path: '/applications' },
  { label: 'Interviews', path: '/interviews' },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white p-6 md:block">
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
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
