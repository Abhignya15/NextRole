import PageHeader from '../../../components/layout/PageHeader';

function ProfilePage() {
  return (
    <div>
      <PageHeader title="Profile" subtitle="Update your career information." />
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">
          This is a placeholder for your profile page.
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
