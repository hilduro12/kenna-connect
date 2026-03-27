import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const freeFeatures = [
  "Browse tutors",
  "See profiles and ratings",
  "Search by subject",
];

const plusFeatures = [
  "Everything in Free",
  "Contact unlimited tutors",
  "Book online lessons",
  "Parent dashboard",
  "Write reviews",
  "Priority support",
];

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your Kenna Plus subscription at any time. There are no lock-in contracts." },
  { q: "Do tutors pay anything?", a: "No. It's completely free for tutors to create a profile and receive messages from subscribers." },
  { q: "What if I'm not satisfied?", a: "If you're not happy with the platform within the first 14 days, we'll give you a full refund — no questions asked." },
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Simple, transparent pricing</h1>
          <p className="mt-2 text-steel">No hidden fees. Cancel anytime.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 md:grid-cols-2">
          {/* Free */}
          <div className="flex flex-col rounded-lg border border-border bg-card p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground">Free</h3>
            <p className="mt-4">
              <span className="text-4xl font-bold text-foreground">0 ISK</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Forever free</p>
            <ul className="mt-6 flex-1 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-steel">
                  <Check size={16} className="mt-0.5 shrink-0 text-cold" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-8 w-full" size="lg">
              Get Started
            </Button>
          </div>

          {/* Plus */}
          <div className="relative flex flex-col rounded-lg border-2 border-primary bg-card p-8 shadow-md">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
              Most popular
            </span>
            <h3 className="text-xl font-semibold text-foreground">Kenna Plus</h3>
            <p className="mt-4">
              <span className="text-4xl font-bold text-foreground">2,900 ISK</span>
              <span className="text-muted-foreground">/month</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Cancel anytime</p>
            <ul className="mt-6 flex-1 space-y-3">
              {plusFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-steel">
                  <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Button className="mt-8 w-full" size="lg">
              Subscribe Now
            </Button>
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
