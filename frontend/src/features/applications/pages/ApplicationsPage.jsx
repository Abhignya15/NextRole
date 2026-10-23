import PageHeader from '../../../components/layout/PageHeader';

function ApplicationsPage() {
  return (
    <div>
      <PageHeader title="Applications" subtitle="Track roles you've applied to." />
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">This is a placeholder for the applications page.</p>
      </div>
    </div>
  );
}

export default ApplicationsPage;
