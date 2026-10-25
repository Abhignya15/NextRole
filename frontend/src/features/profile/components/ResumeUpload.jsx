function ResumeUpload({ profile, onChange }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">
        04 Resume
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-slate-700 md:col-span-2">
          <span className="mb-2 block">Upload resume</span>
          <input
            type="file"
            name="resumeName"
            value={profile.resumeName}
            onChange={onChange}
            accept=".pdf,.doc,.docx"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
          />
        </label>

        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500 md:col-span-2">
          {profile.resumeName ? `Selected file: ${profile.resumeName}` : 'No file selected yet'}
        </div>
      </div>
    </section>
  );
}

export default ResumeUpload;
