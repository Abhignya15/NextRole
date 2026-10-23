const navItems = [
  'Dashboard',
  'Profile',
  'Jobs',
  'Applications',
  'Interviews',
];

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-slate-200 bg-white p-6 md:block">
      <div className="mb-10">
        <p className="text-xl font-bold tracking-tight text-slate-900">NextRole</p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item, index) => (
          <button
            key={item}
            className={`flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
              index === 0
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
            type="button"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
