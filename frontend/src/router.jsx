import DashboardPage from './features/dashboard/pages/DashboardPage';
import ProfilePage from './features/profile/pages/ProfilePage';

const routes = [
  { path: '/', element: <DashboardPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/jobs', element: null },
  { path: '/applications', element: null },
  { path: '/interviews', element: null },
  { path: '/login', element: null },
  { path: '/signup', element: null },
];

export default routes;
