import { useState } from 'react';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ExperienceForm from '../components/ExperienceForm';
import CareerPreferencesForm from '../components/CareerPreferencesForm';
import ResumeUpload from '../components/ResumeUpload';

const initialProfile = {
  jobTitle: '',
  experience: '',
  currentCtc: '',
  expectedCtc: '',
  summary: '',
  skills: '',
  targetRole: '',
  location: '',
  preference: 'Hybrid',
  resumeName: '',
};

function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaved(false);
  };

  const handleSave = () => {
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
          <PersonalInfoForm profile={profile} onChange={handleChange} />
          <ExperienceForm profile={profile} onChange={handleChange} />
          <CareerPreferencesForm profile={profile} onChange={handleChange} />
          <ResumeUpload profile={profile} onChange={handleChange} />

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
