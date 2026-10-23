function ProfileSetup() {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            GET STARTED
          </span>

          <h3 className="mt-4 text-xl font-semibold text-slate-900">
            Let's set up your career profile
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Upload your resume, tell us your target roles, and share your
            compensation and location preferences.
          </p>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Set up profile →
        </button>
      </div>
    </section>
  );
}

export default ProfileSetup;
