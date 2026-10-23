import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="min-h-screen md:ml-64">
        <Header />
        <div className="mx-auto max-w-6xl px-8 py-10">{children}</div>
      </main>
    </div>
  );
}

export default DashboardLayout;
