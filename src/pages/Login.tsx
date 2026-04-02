import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const IS_DEV = import.meta.env.DEV;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const redirectPath = login(email, password);
    navigate(redirectPath);
  };

  const handleQuickLogin = (demoEmail: string, demoPassword: string) => {
    setError("");
    const redirectPath = login(demoEmail, demoPassword);
    navigate(redirectPath);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 pt-8 pb-12">
      <div className="relative w-full max-w-sm">
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute -top-2 left-0 flex h-9 w-9 items-center justify-center rounded-full text-steel transition-colors hover:bg-light-bg hover:text-foreground"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center pt-8">
          {/* Logo */}
          <Link to="/" className="text-3xl font-extrabold tracking-tight text-foreground">
            Kenna
          </Link>

          {/* Heading */}
          <h1 className="mt-8 text-2xl font-bold text-foreground">Log in</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 w-full space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-full bg-light-bg px-5 py-3 text-sm text-foreground placeholder:text-cold outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-full bg-light-bg px-5 py-3 text-sm text-foreground placeholder:text-cold outline-none focus:ring-2 focus:ring-primary"
            />
            {error && (
              <p className="text-center text-xs text-red-500">{error}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-foreground py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Log in with email
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-cold">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social buttons */}
          <div className="w-full space-y-3">
            <button className="flex w-full items-center justify-center gap-3 rounded-full border border-light-border bg-background py-3 text-sm font-medium text-foreground transition-colors hover:bg-light-bg">
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1 0-9.18l-7.98-6.19a24.01 24.01 0 0 0 0 21.56l7.98-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Log in with Google
            </button>
            <button className="flex w-full items-center justify-center gap-3 rounded-full border border-light-border bg-background py-3 text-sm font-medium text-foreground transition-colors hover:bg-light-bg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.53-3.23 0-1.44.66-2.2.47-3.06-.4C3.79 16.17 4.36 9.02 8.9 8.75c1.26.06 2.14.72 2.88.76.97-.2 1.9-.87 3.09-.79 1.48.12 2.59.7 3.32 1.76-3.04 1.82-2.32 5.83.48 6.95-.57 1.5-1.31 2.99-2.62 4.85zM12.03 8.67c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Log in with Apple
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-8 text-sm text-steel">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-foreground hover:underline">Sign up</Link>
          </p>

          {/* Legal */}
          <p className="mt-6 pb-8 text-xs text-cold">
            By logging in, you agree to our{" "}
            <a href="#" className="underline hover:text-steel">legal notices</a>
          </p>

          {/* ── Dev-only quick login buttons ── */}
          {IS_DEV && (
            <div className="w-full border-t border-dashed border-border pt-6 pb-4">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-cold">
                Dev quick login
              </p>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleQuickLogin("student@kenna.test", "demo123")}
                  className="w-full rounded-full border border-blue-200 bg-blue-50 py-2.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  Student (no subscription)
                </button>
                <button
                  onClick={() => handleQuickLogin("subscribed@kenna.test", "demo123")}
                  className="w-full rounded-full border border-indigo-200 bg-indigo-50 py-2.5 text-xs font-medium text-indigo-700 transition-colors hover:bg-indigo-100"
                >
                  Student (subscribed)
                </button>
                <button
                  onClick={() => handleQuickLogin("tutor@kenna.test", "demo123")}
                  className="w-full rounded-full border border-green-200 bg-green-50 py-2.5 text-xs font-medium text-green-700 transition-colors hover:bg-green-100"
                >
                  Approved tutor
                </button>
                <button
                  onClick={() => handleQuickLogin("pendingtutor@kenna.test", "demo123")}
                  className="w-full rounded-full border border-amber-200 bg-amber-50 py-2.5 text-xs font-medium text-amber-700 transition-colors hover:bg-amber-100"
                >
                  Pending tutor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
