function ExperienceForm({ profile, onChange }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">
        02 Experience Overview
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-700 md:col-span-2">
          <span className="mb-2 block">Professional summary</span>
          <textarea
            name="summary"
            value={profile.summary}
            onChange={onChange}
            rows="4"
            placeholder="Tell us about your work experience and strengths"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          />
        </label>

        <label className="block text-sm text-slate-700 md:col-span-2">
          <span className="mb-2 block">Key skills</span>
          <input
            type="text"
            name="skills"
            value={profile.skills}
            onChange={onChange}
            placeholder="e.g. React, SQL, Product strategy"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          />
        </label>
      </div>
    </section>
  );
}

export default ExperienceForm;
