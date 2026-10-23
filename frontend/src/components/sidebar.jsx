function Sidebar() {
  const navigationItems = [
    "Dashboard",
    "My Profile",
    "Job Search",
    "Applications",
    "Mock Interviews",
  ];

  return (
<aside className="fixed inset-y-0 left-0 z-10 hidden w-64 border-r border-slate-200 bg-white p-6 md:block">      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        NextRole<span className="text-indigo-600">.</span>
      </h1>

      <p className="mt-10 mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
        Workspace
      </p>

      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <a
            key={item}
            href="#"
            className={`block rounded-lg px-4 py-3 text-sm font-medium ${
              item === "Dashboard"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar