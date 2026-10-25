import DashboardPage from './features/dashboard/pages/DashboardPage';
import ProfilePage from './features/profile/pages/ProfilePage';
import PrepDashboardPage from './features/prep/pages/PrepDashboardPage';
import CreatePrepPlanPage from './features/prep/pages/CreatePrepPlanPage';
import LoginPage from './features/auth/pages/LoginPage';
import SignupPage from './features/auth/pages/SignupPage';

const routes = [
  { path: '/', element: <DashboardPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/prep', element: <PrepDashboardPage /> },
  { path: '/prep/create', element: <CreatePrepPlanPage /> },
  { path: '/jobs', element: null },
  { path: '/applications', element: null },
  { path: '/interviews', element: null },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
];

export default routes;
