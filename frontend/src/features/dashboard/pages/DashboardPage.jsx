import GettingStarted from '../components/GettingStarted';
import ProfileSetupCard from '../components/ProfileSetupCard';
import WelcomeSection from '../components/WelcomeSection';

function DashboardPage() {
  return (
    <div className="space-y-8">
      <WelcomeSection />
      <ProfileSetupCard />
      <GettingStarted />
    </div>
  );
}

export default DashboardPage;
