import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

function WelcomeSection() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <Badge>YOUR NEXT CHAPTER</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
            Welcome to NextRole 👋
          </h1>
          <p className="mt-3 text-slate-600">
            Your next career move starts here. Let's get your profile ready and
            understand what you're looking for.
          </p>
        </div>

        <Button>Set up profile →</Button>
      </div>
    </section>
  );
}

export default WelcomeSection;
