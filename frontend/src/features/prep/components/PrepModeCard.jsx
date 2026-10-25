import Button from '../../../components/ui/Button';

function PrepModeCard({ title, description, buttonLabel, onClick }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-700">
        {title}
      </div>

      <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

      <div className="mt-6">
        <Button variant="primary" onClick={onClick} className="w-full md:w-auto">
          {buttonLabel}
        </Button>
      </div>
    </section>
  );
}

export default PrepModeCard;
