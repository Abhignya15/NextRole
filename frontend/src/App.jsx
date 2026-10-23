function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 p-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        NextRole<span className="text-indigo-600">.</span>
      </h1>
    </aside>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
    </div>
  );
}

export default App;