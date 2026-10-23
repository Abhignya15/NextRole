function Nextsteps(){
    return(
        <section className="mt-10">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Your next steps
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  A few things to get you started.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-lg">
                    📄
                  </div>

                  <h4 className="mt-4 font-semibold text-slate-900">
                    Upload your resume
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Start by sharing your experience and skills.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-lg">
                    🎯
                  </div>

                  <h4 className="mt-4 font-semibold text-slate-900">
                    Define your goals
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Choose your target roles, salary, and locations.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-lg">
                    ✨
                  </div>

                  <h4 className="mt-4 font-semibold text-slate-900">
                    Explore NextRole
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Discover tools to help you plan your next move.
                  </p>
                </div>
              </div>
            </section>

    );
}

export default Nextsteps