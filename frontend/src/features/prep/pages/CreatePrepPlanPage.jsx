import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import TopicWeightageEditor from '../components/TopicWeightageEditor';

const PREP_PLAN_KEY = 'nextrole-prep-plan';

const defaultTopics = [
  { id: 1, name: 'React', weight: 15, confidence: 'Medium', subtopics: 'Hooks, state, performance', notes: '' },
  { id: 2, name: 'Node.js', weight: 15, confidence: 'Medium', subtopics: 'APIs, async flows', notes: '' },
  { id: 3, name: 'AWS', weight: 20, confidence: 'Low', subtopics: 'IAM, EC2, S3', notes: '' },
  { id: 4, name: 'Terraform', weight: 20, confidence: 'Low', subtopics: 'modules, state', notes: '' },
  { id: 5, name: 'CI/CD', weight: 20, confidence: 'Medium', subtopics: 'pipelines, deployments', notes: '' },
  { id: 6, name: 'SOLID principles', weight: 10, confidence: 'High', subtopics: 'SRP, DIP', notes: '' },
];

function CreatePrepPlanPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    goal: 'Technical job interview',
    planName: '',
    targetRole: '',
    companyName: '',
    interviewDate: '',
    experienceYears: '',
    currentJobTitle: '',
    experienceLevel: 'Intermediate',
    difficulty: 'Adaptive',
    dailyMinutes: 45,
    questionsPerSession: 12,
    mode: 'Both',
    responseMode: 'Both',
    questionTypes: ['Multiple choice', 'Conceptual'],
    topics: defaultTopics,
  });
  const [error, setError] = useState('');

  const totalWeight = useMemo(
    () => form.topics.reduce((sum, topic) => sum + Number(topic.weight || 0), 0),
    [form.topics]
  );

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleTopicChange = (index, field, value) => {
    setForm((prev) => {
      const nextTopics = [...prev.topics];
      nextTopics[index] = { ...nextTopics[index], [field]: value };
      return { ...prev, topics: nextTopics };
    });
    setError('');
  };

  const handleAddTopic = () => {
    setForm((prev) => ({
      ...prev,
      topics: [
        ...prev.topics,
        {
          id: Date.now(),
          name: '',
          weight: 0,
          confidence: 'Medium',
          subtopics: '',
          notes: '',
        },
      ],
    }));
  };

  const handleRemoveTopic = (index) => {
    setForm((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, topicIndex) => topicIndex !== index),
    }));
  };

  const handleToggleQuestionType = (type) => {
    setForm((prev) => {
      const questionTypes = prev.questionTypes.includes(type)
        ? prev.questionTypes.filter((item) => item !== type)
        : [...prev.questionTypes, type];

      return { ...prev, questionTypes };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.planName.trim()) {
      setError('Please enter a preparation plan name.');
      return;
    }

    if (!form.targetRole.trim()) {
      setError('Please enter a target role or certification.');
      return;
    }

    const hasEmptyTopicName = form.topics.some((topic) => !topic.name.trim());
    if (hasEmptyTopicName) {
      setError('Every topic needs a name before creating the plan.');
      return;
    }

    if (totalWeight !== 100) {
      setError('Total topic weightage must equal 100% before creating the plan.');
      return;
    }

    const finalPlan = {
      ...form,
      createdAt: new Date().toISOString(),
      topics: form.topics.map((topic) => ({
        ...topic,
        id: topic.id ?? `${topic.name}-${Date.now()}`,
      })),
    };

    localStorage.setItem(PREP_PLAN_KEY, JSON.stringify(finalPlan));
    navigate('/prep');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">Create my prep plan</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Preparation goal</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            'Technical job interview',
            'Internal promotion',
            'Certification exam',
            'Technical assessment',
            'Custom goal',
          ].map((goal) => (
            <label key={goal} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              <input
                type="radio"
                name="goal"
                checked={form.goal === goal}
                onChange={() => updateField('goal', goal)}
                className="h-4 w-4 text-indigo-600"
              />
              {goal}
            </label>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Preparation plan name</span>
            <input
              type="text"
              value={form.planName}
              onChange={(event) => updateField('planName', event.target.value)}
              placeholder="e.g. Frontend Interview Sprint"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            />
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Target role or certification</span>
            <input
              type="text"
              value={form.targetRole}
              onChange={(event) => updateField('targetRole', event.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            />
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Company name</span>
            <input
              type="text"
              value={form.companyName}
              onChange={(event) => updateField('companyName', event.target.value)}
              placeholder="Optional"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            />
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Interview or exam date</span>
            <input
              type="date"
              value={form.interviewDate}
              onChange={(event) => updateField('interviewDate', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            />
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Years of experience</span>
            <input
              type="number"
              min="0"
              value={form.experienceYears}
              onChange={(event) => updateField('experienceYears', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            />
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Current job title</span>
            <input
              type="text"
              value={form.currentJobTitle}
              onChange={(event) => updateField('currentJobTitle', event.target.value)}
              placeholder="Optional"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Select topics</h2>
          <p className="mt-2 text-sm text-slate-600">Add, remove and customise your preparation topics. The total must equal 100%.</p>
        </div>

        <TopicWeightageEditor
          topics={form.topics}
          onTopicChange={handleTopicChange}
          onAddTopic={handleAddTopic}
          onRemoveTopic={handleRemoveTopic}
        />

        {totalWeight !== 100 ? (
          <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Total weightage must equal 100% before you can create the plan.
          </p>
        ) : (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Weightage is valid and ready to save.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Preparation preferences</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Experience level</span>
            <select
              value={form.experienceLevel}
              onChange={(event) => updateField('experienceLevel', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Difficulty</span>
            <select
              value={form.difficulty}
              onChange={(event) => updateField('difficulty', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Adaptive">Adaptive</option>
            </select>
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Daily preparation time (minutes)</span>
            <input
              type="number"
              min="15"
              step="15"
              value={form.dailyMinutes}
              onChange={(event) => updateField('dailyMinutes', Number(event.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            />
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Questions per session</span>
            <input
              type="number"
              min="1"
              value={form.questionsPerSession}
              onChange={(event) => updateField('questionsPerSession', Number(event.target.value) || 0)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            />
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Mode</span>
            <select
              value={form.mode}
              onChange={(event) => updateField('mode', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            >
              <option value="Quiz Mode">Quiz Mode</option>
              <option value="Mock Interview Mode">Mock Interview Mode</option>
              <option value="Both">Both</option>
            </select>
          </label>

          <label className="block text-sm text-slate-700">
            <span className="mb-2 block">Answer style</span>
            <select
              value={form.responseMode}
              onChange={(event) => updateField('responseMode', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-700 outline-none"
            >
              <option value="Typed answers">Typed answers</option>
              <option value="Voice answers">Voice answers</option>
              <option value="Both">Both</option>
            </select>
          </label>
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-slate-700">Question types</p>
          <div className="flex flex-wrap gap-2">
            {['Multiple choice', 'Conceptual', 'Scenario-based', 'Troubleshooting', 'Coding'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleToggleQuestionType(type)}
                className={`rounded-full border px-3 py-2 text-sm font-medium ${
                  form.questionTypes.includes(type)
                    ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Preparation timeline</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Days remaining</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">
              {form.interviewDate ? Math.max(0, Math.ceil((new Date(form.interviewDate) - new Date()) / 86400000)) : 0}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Suggested daily time</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{form.dailyMinutes || 45} min</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Suggested focus</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{form.goal}</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Review and create</h2>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Plan</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{form.planName || 'Untitled plan'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Target</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{form.targetRole || 'Not set yet'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Difficulty</p>
              <p className="mt-1 text-slate-700">{form.difficulty}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Mode</p>
              <p className="mt-1 text-slate-700">{form.mode}</p>
            </div>
          </div>
        </div>
      </section>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex flex-col justify-end gap-3 sm:flex-row">
        <Button type="button" variant="secondary" onClick={() => navigate('/prep')}>
          Cancel
        </Button>
        <Button type="submit">Create My Prep Plan</Button>
      </div>
    </form>
  );
}

export default CreatePrepPlanPage;
