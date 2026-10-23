function ApplicationCard({ role = 'Product Designer', status = 'Applied' }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{role}</h3>
      <p className="mt-2 text-sm text-slate-500">Status: {status}</p>
    </div>
  );
}

export default ApplicationCard;
