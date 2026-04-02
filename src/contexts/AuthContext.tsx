import { createContext, useContext, useState, ReactNode } from "react";
import { authenticateMockUser, type TutorStatus } from "@/data/mock-users";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "parent" | "tutor";
  /** Roles this user has been granted (e.g. ["tutor"] or ["student","tutor"]) */
  roles: string[];
  /** Whether the user has an active student subscription */
  subscribed: boolean;
  /** Tutor-specific: approval status. Only relevant when role includes "tutor". */
  tutorStatus?: TutorStatus;
}

interface AuthContextType {
  user: User | null;
  /** True if user has an active student subscription (or preview is on) */
  isSubscribed: boolean;
  /** True if user can browse as a student (has student role + subscription) */
  hasStudentAccess: boolean;
  previewLoggedIn: boolean;
  togglePreview: () => void;
  /** Switch the active role between tutor <-> student (for dual-role users) */
  toggleRole: () => void;
  /**
   * Log in with email + password.
   * Returns the redirect path based on role/status so the caller can navigate.
   */
  login: (email: string, password: string) => string;
  logout: () => void;
  signup: (data: { name: string; email: string; password: string; role: "student" | "parent" | "tutor" }) => void;
  /** Mock: activate a student subscription. Replace with Stripe/billing later. */
  activateSubscription: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Decide where to send a user after login based on role + status + subscription */
function getRedirectPath(user: User): string {
  if (user.role === "tutor") {
    if (user.tutorStatus === "pending_review") return "/application-pending";
    return "/tutor-dashboard";
  }
  // Students/parents without subscription → choose plan
  if (!user.subscribed) return "/choose-plan";
  return "/dashboard";
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("kenna_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [previewLoggedIn, setPreviewLoggedIn] = useState(false);

  const togglePreview = () => {
    setPreviewLoggedIn((v) => {
      const next = !v;
      if (next && !user) {
        const previewUser: User = {
          id: "preview",
          name: "Demo User",
          email: "demo@kenna.is",
          role: "student",
          roles: ["student"],
          subscribed: true,
        };
        setUser(previewUser);
      } else if (!next && user?.id === "preview") {
        setUser(null);
        localStorage.removeItem("kenna_user");
      }
      return next;
    });
  };

  const isSubscribed = (user?.subscribed ?? false) || previewLoggedIn;

  /* A user has student access only if they have the student role AND an active subscription.
     Tutor-only users see blurred tutor cards (same as logged-out). */
  const hasStudentAccess =
    isSubscribed && (user?.roles?.includes("student") || user?.roles?.includes("parent") || false);

  const toggleRole = () => {
    if (!user) return;
    if (user.roles.length <= 1) return;
    const newRole = user.role === "tutor" ? "student" : "tutor";
    const updated = { ...user, role: newRole as User["role"] };
    setUser(updated);
    localStorage.setItem("kenna_user", JSON.stringify(updated));
  };

  const login = (email: string, password: string): string => {
    // Try mock users first (development)
    const mockResult = authenticateMockUser(email, password);

    if (mockResult) {
      const authUser: User = { ...mockResult.user, tutorStatus: mockResult.tutorStatus };
      setUser(authUser);
      localStorage.setItem("kenna_user", JSON.stringify(authUser));
      return getRedirectPath(authUser);
    }

    // Fallback: create a generic student user (for any email/password in dev)
    // In production: replace with Supabase auth call
    const fallbackUser: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role: "student",
      roles: ["student"],
      subscribed: false,
    };
    setUser(fallbackUser);
    localStorage.setItem("kenna_user", JSON.stringify(fallbackUser));
    return getRedirectPath(fallbackUser);
  };

  const signup = (data: { name: string; email: string; password: string; role: "student" | "parent" | "tutor" }) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role,
      roles: [data.role],
      subscribed: false,
    };
    setUser(newUser);
    localStorage.setItem("kenna_user", JSON.stringify(newUser));
  };

  const activateSubscription = () => {
    if (!user) return;
    const updated = { ...user, subscribed: true };
    setUser(updated);
    localStorage.setItem("kenna_user", JSON.stringify(updated));
  };

  const logout = () => {
    setUser(null);
    setPreviewLoggedIn(false);
    localStorage.removeItem("kenna_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isSubscribed,
        hasStudentAccess,
        previewLoggedIn,
        togglePreview,
        toggleRole,
        login,
        logout,
        signup,
        activateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
