function JobCard({ title = 'Role Title', company = 'Company', location = 'Remote' }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-600">{company}</p>
      <p className="mt-2 text-sm text-slate-500">{location}</p>
    </div>
  );
}

export default JobCard;
