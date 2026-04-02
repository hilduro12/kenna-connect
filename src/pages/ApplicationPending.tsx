import { Clock, ShieldCheck, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const ApplicationPending = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm md:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
              <Clock size={40} className="text-amber-600" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-foreground">
              Application under review
            </h1>
            <p className="mt-3 text-steel">
              Hi {user?.name?.split(" ")[0] ?? "there"}, your teacher application is being reviewed by our team.
              We'll send you an email once a decision has been made.
            </p>

            {/* Status steps */}
            <div className="mt-8 space-y-4 text-left">
              <div className="flex items-start gap-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <ShieldCheck size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-800">Application submitted</p>
                  <p className="mt-0.5 text-xs text-green-700">We received your application.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Clock size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">Under review</p>
                  <p className="mt-0.5 text-xs text-amber-700">Our team is reviewing your profile and credentials.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-border bg-light-bg p-4 opacity-50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                  <Mail size={16} className="text-cold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Login credentials sent</p>
                  <p className="mt-0.5 text-xs text-steel">You'll receive an email when approved.</p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-xs text-cold">
              Most applications are reviewed within 1–2 business days.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/">
                <Button variant="outline">Back to home</Button>
              </Link>
              <Button
                variant="ghost"
                className="text-steel"
                onClick={() => { logout(); navigate("/"); }}
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApplicationPending;
