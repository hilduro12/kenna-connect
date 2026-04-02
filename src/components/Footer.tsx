import { Link } from "react-router-dom";
import { BRAND, FOOTER } from "@/lib/strings";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-steel text-white">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-extrabold">{BRAND.name}</h3>
            <p className="mt-2 text-sm text-white/60">
              {BRAND.tagline}
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">{FOOTER.platform}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/browse" className="hover:underline">{FOOTER.browseTeachers}</Link></li>
              <li><Link to="/pricing" className="hover:underline">{FOOTER.pricing}</Link></li>
              <li><Link to="/tutor-signup" className="hover:underline">{FOOTER.startTeaching}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">{FOOTER.company}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">{FOOTER.about}</a></li>
              <li><a href="#" className="hover:underline">{FOOTER.contact}</a></li>
              <li><a href="#" className="hover:underline">{FOOTER.faq}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/50">{FOOTER.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">{FOOTER.privacy}</a></li>
              <li><a href="#" className="hover:underline">{FOOTER.terms}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          &copy; 2026 {BRAND.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
