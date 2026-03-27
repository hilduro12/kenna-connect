import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

type Role = null | "student" | "tutor";

const SignUp = () => {
  const [role, setRole] = useState<Role>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  if (role === null) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-16">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-3xl font-bold text-foreground">Join Kenna</h1>
            <p className="mt-2 text-steel">How would you like to use Kenna?</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setRole("student")}
                className="group rounded-lg border-2 border-border bg-card p-8 text-center shadow-sm transition-all hover:border-primary hover:shadow-md"
              >
                <GraduationCap size={40} className="mx-auto text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">I want to find a teacher</h3>
                <p className="mt-2 text-sm text-steel">Browse and connect with tutors across Iceland</p>
              </button>
              <button
                onClick={() => navigate("/tutor-signup")}
                className="group rounded-lg border-2 border-border bg-card p-8 text-center shadow-sm transition-all hover:border-primary hover:shadow-md"
              >
                <BookOpen size={40} className="mx-auto text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">I want to teach on Kenna</h3>
                <p className="mt-2 text-sm text-steel">Create a profile and start reaching students</p>
              </button>
            </div>

            <p className="mt-6 text-sm text-steel">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">Log in</Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ name, email, password, role: role as "student" });
    navigate("/browse");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container py-12">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold text-foreground text-center">Create your account</h1>
          <p className="mt-2 text-center text-sm text-steel">
            Subscribe and get full access to all teachers
          </p>

          <form onSubmit={handleSubmit} className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Full name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">Sign Up & Subscribe</Button>
          </form>

          <button
            onClick={() => setRole(null)}
            className="mt-4 block w-full text-center text-sm text-steel hover:text-foreground"
          >
            ← Back to role selection
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
