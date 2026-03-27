import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const StudentSignUp = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-12">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold text-foreground text-center">Sign up and find a tutor</h1>

          <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Full name</label>
                <input className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
                <input type="email" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@email.com" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
                <input type="password" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="••••••••" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">I am a...</label>
                <select className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Student</option>
                  <option>Parent</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Child's age / level (if parent)</label>
                <input className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 14 years, 9th grade" />
              </div>
              <Button className="w-full" size="lg">Create Account</Button>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-light-bg p-5 text-center">
            <p className="text-sm text-steel">
              Browse tutors for free. Subscribe from <strong className="text-foreground">2,900 ISK/month</strong> to connect with tutors and access all platform features.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentSignUp;
