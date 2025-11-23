import { InstantVerificationForm } from './instant-verification-form';

export default function EmployerPortalPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 font-headline">Employer Portal</h1>
      <p className="text-muted-foreground mb-8">
        Verify candidate credentials with confidence. Use our AI-powered tool
        for instant verification and trust assessment.
      </p>
      <InstantVerificationForm />
    </div>
  );
}
