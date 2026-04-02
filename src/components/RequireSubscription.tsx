/**
 * Route guard: redirects unsubscribed students to the Choose Plan page.
 * Tutors pass through unaffected.
 *
 * Usage in App.tsx:
 *   <Route path="/dashboard" element={<RequireSubscription><Dashboard /></RequireSubscription>} />
 *
 * Replace with real entitlement check when Supabase billing is wired up.
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RequireSubscription = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  // Not logged in → login
  if (!user) return <Navigate to="/login" replace />;

  // Tutors are never gated by student subscription
  if (user.role === "tutor") return <>{children}</>;

  // Students/parents without subscription → choose plan
  if (!user.subscribed) return <Navigate to="/choose-plan" replace />;

  return <>{children}</>;
};

export default RequireSubscription;
