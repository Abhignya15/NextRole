function CareerPreferencesForm({ profile, onChange }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">
        03 Career Preferences
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-700 md:col-span-2">
          <span className="mb-2 block">Target role</span>
          <input
            type="text"
            name="targetRole"
            value={profile.targetRole}
            onChange={onChange}
            placeholder="e.g. Cloud Engineer"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          />
        </label>

        <label className="block text-sm text-slate-700 md:col-span-2">
          <span className="mb-2 block">Preferred location</span>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={onChange}
            placeholder="e.g. Bengaluru"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          />
        </label>

        <label className="block text-sm text-slate-700 md:col-span-2">
          <span className="mb-2 block">Work preference</span>
          <select
            name="preference"
            value={profile.preference}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          >
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default CareerPreferencesForm;
