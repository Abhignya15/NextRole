import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import PrepModeCard from '../components/PrepModeCard';
import { fetchLatestPrepPlan } from '../services/prepPlanService';

function PrepDashboardPage() {
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadPlan = async () => {
      try {
        const latestPlan = await fetchLatestPrepPlan();

        if (isMounted) {
          setPlan(latestPlan);
        }
      } catch (error) {
        console.error('Failed to load prep plan:', error);

        if (isMounted) {
          setPlan(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPlan();

    return () => {
      isMounted = false;
    };
  }, []);

  const hasPlan = Boolean(plan?.planName);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-700">
            Interview Prep
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Let’s get you interview-ready.
          </h1>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Prepare for your next interview with personalised quizzes, realistic mock interviews and actionable feedback.
          </p>

          <div className="mt-6">
            <Button onClick={() => navigate('/prep/create')}>Create My Prep Plan</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <PrepModeCard
          title="Quiz Mode"
          description="Test your knowledge with structured questions, topic-based practice and explanations."
          buttonLabel="Start a Quiz"
          onClick={() => navigate('/prep/create')}
        />

        <PrepModeCard
          title="Mock Interview"
          description="Practise realistic technical interviews with questions, follow-ups and answer feedback."
          buttonLabel="Start Mock Interview"
          onClick={() => navigate('/prep/create')}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Current preparation plan</h3>

          {loading ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
              Loading your preparation plan...
            </div>
          ) : !hasPlan ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-base font-medium text-slate-900">No preparation plan yet</p>
              <p className="mt-2 text-sm text-slate-600">
                Create your first preparation plan to start tracking your interview readiness.
              </p>
              <div className="mt-5 flex justify-center">
                <Button onClick={() => navigate('/prep/create')}>Create My Prep Plan</Button>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Plan</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{plan.planName}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Target role</p>
                  <p className="mt-1 text-slate-900">{plan.targetRole}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Interview date</p>
                  <p className="mt-1 text-slate-900">{plan.interviewDate || 'Not set yet'}</p>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Upcoming interview or certification date</h3>

          {!hasPlan ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
              No interview or certification date has been scheduled yet.
            </div>
          ) : (
            <div className="mt-4 space-y-4 text-sm text-slate-600">
              <div className="rounded-xl bg-indigo-50 p-4 text-indigo-800">
                <p className="text-xs font-semibold uppercase tracking-[0.12em]">Upcoming date</p>
                <p className="mt-2 text-lg font-semibold">{plan.interviewDate || 'Not scheduled yet'}</p>
              </div>
              <p>Suggested daily preparation time: {plan.dailyMinutes || 45} minutes</p>
            </div>
          )}
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Selected topics and their progress</h3>

          {!hasPlan ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
              Your selected topics will appear here once you create a prep plan.
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {plan.topics?.map((topic) => (
                <div key={topic.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-slate-900">{topic.name}</p>
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                      {topic.weight}%
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${Math.min(topic.weight, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Recent practice sessions</h3>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            {!hasPlan ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
                No recent practice sessions yet.
              </div>
            ) : (
              <>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="font-medium text-slate-900">JavaScript fundamentals review</p>
                  <p className="mt-1">Score: 82% • 2 days ago</p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="font-medium text-slate-900">System design warmup</p>
                  <p className="mt-1">Score: 74% • 5 days ago</p>
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Areas that need improvement</h3>

        {!hasPlan ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
            You will see improvement areas here after creating your preparation plan.
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            {plan.topics?.slice(0, 3).map((topic) => (
              <span key={topic.id} className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                {topic.name}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default PrepDashboardPage;
