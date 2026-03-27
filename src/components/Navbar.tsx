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
    `text-sm font-medium transition-colors hover:text-white ${
      location.pathname === to ? "text-white" : "text-white/70"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-steel">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-white">
          Kenna
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/browse" className={linkClass("/browse")}>Browse</Link>
          <Link to="/pricing" className={linkClass("/pricing")}>Pricing</Link>
          <div className="h-5 w-px bg-white/20" />
          <Link to="/tutor-signup" className={linkClass("/tutor-signup")}>For Teachers</Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm text-white/70">Hi, {user.name}</span>
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10" onClick={() => { logout(); navigate("/"); }}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-white text-steel hover:bg-white/90">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        <button className="text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-steel px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/browse" onClick={() => setOpen(false)} className="text-sm font-medium text-white/70 hover:text-white">Browse</Link>
            <Link to="/pricing" onClick={() => setOpen(false)} className="text-sm font-medium text-white/70 hover:text-white">Pricing</Link>
            <Link to="/tutor-signup" onClick={() => setOpen(false)} className="text-sm font-medium text-white/70 hover:text-white">For Teachers</Link>
            <hr className="border-white/10" />
            {user ? (
              <Button variant="ghost" size="sm" className="w-full text-white/70 hover:text-white hover:bg-white/10" onClick={() => { logout(); navigate("/"); setOpen(false); }}>
                Log Out
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full text-white/70 hover:text-white hover:bg-white/10">Log In</Button>
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <Button size="sm" className="w-full bg-white text-steel hover:bg-white/90">Sign Up</Button>
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
