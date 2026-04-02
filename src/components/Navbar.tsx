import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, MessageCircle, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isTutor = user?.role === "tutor";
  const dashboardPath = isTutor ? "/tutor-dashboard" : "/dashboard";

  const linkClass = (to: string) =>
    `text-sm font-medium transition-colors hover:text-white ${
      location.pathname === to ? "text-white" : "text-white/70"
    }`;

  const mobileLinkClass = "text-sm font-medium text-white/70 hover:text-white";

  return (
    <nav className="sticky top-0 z-50 bg-steel">
      <div className="container flex h-16 items-center justify-between">
        <Link to={user ? dashboardPath : "/"} className="text-2xl font-extrabold tracking-tight text-white">
          Kenna
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {user ? (
            <>
              <Link to={dashboardPath} className={linkClass(dashboardPath)}>
                <span className="flex items-center gap-1.5"><LayoutDashboard size={16} /> Dashboard</span>
              </Link>
              {!isTutor && <Link to="/browse" className={linkClass("/browse")}>Browse</Link>}
              <Link to="/bookings" className={linkClass("/bookings")}>
                <span className="flex items-center gap-1.5"><Calendar size={16} /> {isTutor ? "Schedule" : "Bookings"}</span>
              </Link>
              <Link to="/messages" className={linkClass("/messages")}>
                <span className="flex items-center gap-1.5"><MessageCircle size={16} /> Messages</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/browse" className={linkClass("/browse")}>Browse</Link>
              <Link to="/pricing" className={linkClass("/pricing")}>Pricing</Link>
              <div className="h-5 w-px bg-white/20" />
              <Link to="/tutor-signup" className={linkClass("/tutor-signup")}>For Teachers</Link>
            </>
          )}
        </div>

        {/* Desktop right side */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <Link to="/account" className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                <User size={16} />
                {user.name}
              </Link>
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

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-steel px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {user ? (
              <>
                <Link to={dashboardPath} onClick={() => setOpen(false)} className={mobileLinkClass}>
                  <span className="flex items-center gap-2"><LayoutDashboard size={16} /> Dashboard</span>
                </Link>
                {!isTutor && <Link to="/browse" onClick={() => setOpen(false)} className={mobileLinkClass}>Browse</Link>}
                <Link to="/bookings" onClick={() => setOpen(false)} className={mobileLinkClass}>
                  <span className="flex items-center gap-2"><Calendar size={16} /> {isTutor ? "Schedule" : "Bookings"}</span>
                </Link>
                <Link to="/messages" onClick={() => setOpen(false)} className={mobileLinkClass}>
                  <span className="flex items-center gap-2"><MessageCircle size={16} /> Messages</span>
                </Link>
                <Link to="/account" onClick={() => setOpen(false)} className={mobileLinkClass}>
                  <span className="flex items-center gap-2"><User size={16} /> Account</span>
                </Link>
                <hr className="border-white/10" />
                <Button variant="ghost" size="sm" className="w-full text-white/70 hover:text-white hover:bg-white/10" onClick={() => { logout(); navigate("/"); setOpen(false); }}>
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/browse" onClick={() => setOpen(false)} className={mobileLinkClass}>Browse</Link>
                <Link to="/pricing" onClick={() => setOpen(false)} className={mobileLinkClass}>Pricing</Link>
                <Link to="/tutor-signup" onClick={() => setOpen(false)} className={mobileLinkClass}>For Teachers</Link>
                <hr className="border-white/10" />
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
