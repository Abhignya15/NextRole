import { useEffect, useState } from 'react';

const initialProfile = {
  jobTitle: '',
  experience: '',
  currentCtc: '',
  expectedCtc: '',
  targetRole: '',
  location: '',
  preference: 'Hybrid',
};

const PROFILE_STORAGE_KEY = 'career-profile';

function ProfilePage() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

    if (!savedProfile) {
      return initialProfile;
    }

    try {
      return { ...initialProfile, ...JSON.parse(savedProfile) };
    } catch {
      return initialProfile;
    }
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
      <main className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            My Career Profile
          </h2>
          <div className="mt-2 h-px w-full bg-slate-200" />
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600">
            Let's get to know you. Tell us about your experience and where you
            want your career to go.
          </p>
        </div>

        <div className="space-y-6">
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  placeholder="e.g. ₹ 30 LPA"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-700">
              02 Career Preferences
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block text-sm text-slate-700 md:col-span-2">
                <span className="mb-2 block">Target role</span>
                <input
                  type="text"
                  name="targetRole"
                  value={profile.targetRole}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  placeholder="e.g. Bengaluru"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
                />
              </label>

              <label className="block text-sm text-slate-700 md:col-span-2">
                <span className="mb-2 block">Work preference</span>
                <select
                  name="preference"
                  value={profile.preference}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </label>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            {saved ? (
              <span className="text-sm font-medium text-emerald-600">
                Profile saved
              </span>
            ) : null}

            <button
              type="button"
              onClick={handleSave}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              Save profile
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
