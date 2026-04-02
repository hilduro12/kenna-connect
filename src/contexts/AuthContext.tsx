import { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "parent" | "tutor";
  /** Roles this user has been granted (e.g. ["tutor"] or ["student","tutor"]) */
  roles: string[];
  /** Whether the user has an active student subscription */
  subscribed: boolean;
}

interface AuthContextType {
  user: User | null;
  /** True if user has an active student subscription (or preview is on) */
  isSubscribed: boolean;
  /** True if user can browse as a student (has student role + subscription) */
  hasStudentAccess: boolean;
  previewLoggedIn: boolean;
  togglePreview: () => void;
  /** Switch the active role between tutor ↔ student (for dual-role users) */
  toggleRole: () => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (data: { name: string; email: string; password: string; role: "student" | "parent" | "tutor" }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    // Only allow toggling if user has multiple roles
    if (user.roles.length <= 1) return;
    const newRole = user.role === "tutor" ? "student" : "tutor";
    const updated = { ...user, role: newRole as User["role"] };
    setUser(updated);
    localStorage.setItem("kenna_user", JSON.stringify(updated));
  };

  const login = (email: string, _password: string) => {
    // In production: call Supabase auth, retrieve user profile + roles
    // Mock: create a student user. The real system would look up the user's role.
    const mockUser: User = {
      id: "1",
      name: "Demo User",
      email,
      role: "student",
      roles: ["student"],
      subscribed: true,
    };
    setUser(mockUser);
    localStorage.setItem("kenna_user", JSON.stringify(mockUser));
  };

  const signup = (data: { name: string; email: string; password: string; role: "student" | "parent" | "tutor" }) => {
    const newUser: User = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role,
      roles: [data.role],
      subscribed: false, // New students start unsubscribed
    };
    setUser(newUser);
    localStorage.setItem("kenna_user", JSON.stringify(newUser));
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
