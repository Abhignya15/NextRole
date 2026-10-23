import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Create your account</h2>
        <p className="mt-2 text-sm text-slate-500">Start your next chapter.</p>

        <div className="mt-6 space-y-4">
          <Input type="text" placeholder="Full name" />
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <Button className="w-full">Sign up</Button>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
