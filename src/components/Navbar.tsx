import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Browse Tutors", to: "/browse" },
  { label: "For Tutors", to: "/tutor-signup" },
  { label: "Pricing", to: "/pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-foreground">
          Kenna
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                location.pathname === link.to ? "text-foreground" : "text-steel"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/student-signup">
            <Button variant="ghost" size="sm" className="text-steel hover:text-foreground">
              Log In
            </Button>
          </Link>
          <Link to="/student-signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-steel hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <Link to="/student-signup" onClick={() => setOpen(false)}>
              <Button variant="ghost" size="sm" className="w-full text-steel">
                Log In
              </Button>
            </Link>
            <Link to="/student-signup" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
