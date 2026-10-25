function PersonalInfoForm({ profile, onChange }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">
        01 Professional Information
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block">Current job title</span>
          <input
            type="text"
            name="jobTitle"
            value={profile.jobTitle}
            onChange={onChange}
            placeholder="e.g. Software Engineer"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block">Years of experience</span>
          <input
            type="text"
            name="experience"
            value={profile.experience}
            onChange={onChange}
            placeholder="e.g. 3 years"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-700">
          <span className="mb-2 block">Current CTC</span>
          <input
            type="text"
            name="currentCtc"
            value={profile.currentCtc}
            onChange={onChange}
            placeholder="e.g. ₹ 18 LPA"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          />
        </label>

        <label className="block text-sm text-slate-700">
          <span className="mb-2 block">Expected CTC</span>
          <input
            type="text"
            name="expectedCtc"
            value={profile.expectedCtc}
            onChange={onChange}
            placeholder="e.g. ₹ 30 LPA"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          />
        </label>
      </div>
    </section>
  );
}

export default PersonalInfoForm;
