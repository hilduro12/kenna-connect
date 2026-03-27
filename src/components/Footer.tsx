import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-steel text-white">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-extrabold">Kenna</h3>
            <p className="mt-2 text-sm text-cold">
              Iceland's marketplace for private tutoring.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/browse" className="hover:underline">Browse Tutors</Link></li>
              <li><Link to="/pricing" className="hover:underline">Pricing</Link></li>
              <li><Link to="/tutor-signup" className="hover:underline">For Tutors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-steel pt-6 text-center text-sm text-cold">
          © 2026 Kenna ehf. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
