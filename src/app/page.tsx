import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CheckCircle, Users, Building, Search, Bot } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 font-headline">
              The Future of Verifiable Credentials
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Cred-Pass leverages blockchain and AI to provide a secure,
              transparent, and efficient platform for issuing, managing, and
              verifying academic and professional certificates.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">Explore the Platform</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Why Cred-Pass?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Secure, Instant, and Trusted Verification.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-primary" />}
              title="Instant Verification"
              description="Employers can instantly verify credentials with an AI-powered confidence score, reducing hiring friction."
            />
            <FeatureCard
              icon={
                <div className="h-8 w-8 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-full h-full"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v2h-2v-2zm0 4h2v6h-2v-6z" />
                  </svg>
                </div>
              }
              title="Blockchain Security"
              description="Certificates are issued on a secure blockchain, making them tamper-proof and globally accessible."
            />
            <FeatureCard
              icon={<Bot className="h-8 w-8 text-primary" />}
              title="AI-Powered Fraud Detection"
              description="Our system analyzes certificate data to proactively identify and flag potential fraud, ensuring credential integrity."
            />
          </div>
        </section>

        {/* Portals Section */}
        <section id="portals" className="bg-card/50 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Tailored for You
              </h2>
              <p className="mt-2 text-muted-foreground">
                Dedicated portals for every user in the ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PortalCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="For Students"
                description="Your secure, digital wallet to store, manage, and share all your verified achievements."
                link="/dashboard/student"
              />
              <PortalCard
                icon={<Building className="h-10 w-10 text-primary" />}
                title="For Universities"
                description="Efficiently issue tamper-proof digital certificates and manage alumni records on the blockchain."
                link="/dashboard/university"
              />
              <PortalCard
                icon={<Search className="h-10 w-10 text-primary" />}
                title="For Employers"
                description="Verify candidate credentials instantly, assess talent with confidence, and streamline hiring."
                link="/dashboard/employer"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="bg-card/50 border-border/50 hover:border-primary/50 hover:bg-card transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

function PortalCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Card className="text-center p-6 bg-card border-border/50">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold font-headline mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button variant="link" asChild className="text-primary">
        <Link href={link}>Access Portal &rarr;</Link>
      </Button>
    </Card>
  );
}
