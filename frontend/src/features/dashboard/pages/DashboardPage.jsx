import GettingStarted from "../components/GettingStarted";
import ProfileSetupCard from "../components/ProfileSetupCard";
import WelcomeSection from "../components/WelcomeSection";
import { testSupabaseConnection } from "../../../services/testsupabase";

function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeSection />
      <ProfileSetupCard />
      {/* <button
        type="button"
        onClick={testSupabaseConnection}
        className="rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Test Supabase Connection
      </button> */}
      <GettingStarted />
    </div>
  );
}

export default DashboardPage;
