const nextSteps = [
  {
    icon: "📄",
    title: "Upload your resume",
    description: "Start by sharing your experience and skills.",
  },
  {
    icon: "🎯",
    title: "Define your goals",
    description: "Choose your target roles, salary, and locations.",
  },
  {
    icon: "✨",
    title: "Explore NextRole",
    description: "Discover tools to help you plan your next move.",
  },
];

function NextSteps() {
  return (
    <section className="mt-10">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Your next steps</h3>
        <p className="mt-1 text-sm text-slate-500">
          A few things to get you started.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        {nextSteps.map((step) => (
          <div
            key={step.title}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-lg">
              {step.icon}
            </div>

            <h4 className="mt-4 font-semibold text-slate-900">{step.title}</h4>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NextSteps;