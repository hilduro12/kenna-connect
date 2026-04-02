import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "parent" | "tutor";
  subscribed: boolean;
}

interface AuthContextType {
  user: User | null;
  isSubscribed: boolean;
  previewLoggedIn: boolean;
  togglePreview: () => void;
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

  const toggleRole = () => {
    if (!user) return;
    const newRole = user.role === "tutor" ? "student" : "tutor";
    const updated = { ...user, role: newRole as User["role"] };
    setUser(updated);
    localStorage.setItem("kenna_user", JSON.stringify(updated));
  };

  const login = (email: string, _password: string) => {
    const mockUser: User = {
      id: "1",
      name: "Demo User",
      email,
      role: "student",
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
      subscribed: true,
    };
    setUser(newUser);
    localStorage.setItem("kenna_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kenna_user");
  };

  return (
    <AuthContext.Provider value={{ user, isSubscribed, previewLoggedIn, togglePreview, toggleRole, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
