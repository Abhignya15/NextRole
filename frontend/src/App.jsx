import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import routes from "./router";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Sidebar />

        <main className="min-h-screen md:ml-64">
          <Header />
          <div className="mx-auto max-w-6xl px-8 py-10">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
