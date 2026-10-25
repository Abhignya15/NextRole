import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardPage from './features/dashboard/pages/DashboardPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen md:ml-64">
        <Header />
        <div className="mx-auto max-w-6xl px-8 py-10">
          <DashboardPage />
        </div>
      </main>
    </div>
  );
}

export default App;
