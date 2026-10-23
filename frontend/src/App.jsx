import Sidebar from "./components/sidebar";
import Header from "./components/header";
import ProfileSetup from "./components/profilesetup";
import Nextsteps from "./components/nextsteps";
function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <main className="ml-0 min-h-screen md:ml-64">
        {" "}
        <Header />
        <div className="mx-auto max-w-6xl px-8 py-10">
          <section>
            <p className="text-sm font-semibold text-indigo-600">
              YOUR NEXT CHAPTER
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              Welcome to NextRole 👋
            </h2>

            <ProfileSetup />
            <Nextsteps />

            <p className="mt-3 max-w-2xl text-slate-500">
              Your next career move starts here. Let's get your profile ready
              and understand what you're looking for.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
