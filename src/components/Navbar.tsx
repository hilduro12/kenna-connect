import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = (to: string) =>
    `text-sm font-medium transition-colors hover:text-foreground ${
      location.pathname === to ? "text-foreground" : "text-steel"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-foreground">
          Kenna
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/browse" className={linkClass("/browse")}>Browse</Link>
          <Link to="/pricing" className={linkClass("/pricing")}>Pricing</Link>
          <div className="h-5 w-px bg-border" />
          <Link to="/tutor-signup" className={linkClass("/tutor-signup")}>For Teachers</Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm text-steel">Hi, {user.name}</span>
              <Button variant="ghost" size="sm" className="text-steel hover:text-foreground" onClick={() => { logout(); navigate("/"); }}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-steel hover:text-foreground">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/browse" onClick={() => setOpen(false)} className="text-sm font-medium text-steel hover:text-foreground">Browse</Link>
            <Link to="/pricing" onClick={() => setOpen(false)} className="text-sm font-medium text-steel hover:text-foreground">Pricing</Link>
            <Link to="/tutor-signup" onClick={() => setOpen(false)} className="text-sm font-medium text-steel hover:text-foreground">For Teachers</Link>
            <hr className="border-border" />
            {user ? (
              <Button variant="ghost" size="sm" className="w-full text-steel" onClick={() => { logout(); navigate("/"); setOpen(false); }}>
                Log Out
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full text-steel">Log In</Button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
