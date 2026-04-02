/**
 * Route guard: redirects pending/unapproved tutors to the Application Pending page.
 * Students and approved tutors pass through unaffected.
 *
 * Replace with real backend status check when Supabase is wired up.
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RequireApprovedTutor = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  // Not logged in → login
  if (!user) return <Navigate to="/login" replace />;

  // Pending tutor → application pending
  if (user.role === "tutor" && user.tutorStatus === "pending_review") {
    return <Navigate to="/application-pending" replace />;
  }

  return <>{children}</>;
};

export default RequireApprovedTutor;
