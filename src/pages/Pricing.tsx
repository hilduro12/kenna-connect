import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  "See all teacher profiles",
  "Contact unlimited teachers",
  "Book online lessons",
  "Write reviews",
  "Learning dashboard",
];

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your Kenna subscription at any time. There are no lock-in contracts." },
  { q: "Do teachers pay anything?", a: "No. It's completely free for teachers to create a profile and receive messages from subscribers." },
  { q: "What if I'm not satisfied?", a: "If you're not happy with the platform within the first 14 days, we'll give you a full refund — no questions asked." },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  const price = annual ? "24,900" : "2,900";
  const period = annual ? "year" : "month";

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Simple, transparent pricing</h1>
          <p className="mt-2 text-steel">One plan. Full access. Cancel anytime.</p>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative h-7 w-12 rounded-full transition-colors ${annual ? "bg-primary" : "bg-border"}`}
          >
            <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${annual ? "translate-x-5" : "translate-x-0.5"}`} />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-foreground" : "text-muted-foreground"}`}>
            Annual <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Save 20%</span>
          </span>
        </div>

        {/* Single plan card */}
        <div className="mx-auto mt-10 max-w-md">
          <div className="relative rounded-lg border-2 border-primary bg-card p-8 shadow-md text-center">
            <h3 className="text-xl font-semibold text-foreground">Kenna Subscription</h3>
            <p className="mt-4">
              <span className="text-4xl font-bold text-foreground">{price} ISK</span>
              <span className="text-muted-foreground">/{period}</span>
            </p>
            {annual && <p className="mt-1 text-sm text-primary font-medium">That's just 2,075 ISK/month</p>}
            <p className="mt-1 text-sm text-muted-foreground">Cancel anytime</p>
            <ul className="mt-6 space-y-3 text-left">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-steel">
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/signup">
              <Button className="mt-8 w-full" size="lg">Subscribe Now</Button>
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-foreground">Frequently asked questions</h2>
          <div className="mt-8 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-base font-semibold text-foreground">{faq.q}</h3>
                <p className="mt-1 text-sm text-steel">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
