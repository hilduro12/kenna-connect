import { useState } from "react";
import { Check, MessageCircle, CalendarCheck, LayoutDashboard, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const benefits = [
  { icon: MessageCircle, label: "Message teachers directly" },
  { icon: CalendarCheck, label: "Send lesson requests and book lessons" },
  { icon: LayoutDashboard, label: "Access your dashboard and lesson history" },
  { icon: Star, label: "Leave reviews and ratings" },
  { icon: Shield, label: "Trusted, verified teacher marketplace" },
];

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  perMonth?: string;
  badge?: string;
}

const plans: Plan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: "4,990",
    period: "month",
  },
  {
    id: "quarterly",
    name: "3 months",
    price: "12,990",
    period: "3 months",
    perMonth: "4,330",
    badge: "Best value",
  },
  {
    id: "annual",
    name: "12 months",
    price: "39,900",
    period: "year",
    perMonth: "3,325",
  },
];

const faqs = [
  { q: "Can I cancel anytime?", a: "Yes. You can cancel your Kenna subscription at any time. There are no lock-in contracts." },
  { q: "Do teachers pay anything?", a: "No. It's completely free for teachers to create a profile and receive messages from subscribers." },
  { q: "What if I'm not satisfied?", a: "If you're not happy with the platform within the first 14 days, we'll give you a full refund — no questions asked." },
];

const Pricing = () => {
  const [selected, setSelected] = useState("quarterly");

  const selectedPlan = plans.find((p) => p.id === selected)!;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-12 md:py-20">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">Simple, transparent pricing</h1>
          <p className="mt-3 text-steel">
            Get full access to messaging, booking, and trusted teacher connections on Kenna.
          </p>
        </div>

        {/* Plan cards */}
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const isSelected = selected === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`relative rounded-xl border-2 p-6 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border bg-card hover:border-cold hover:shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white">
                    {plan.badge}
                  </span>
                )}

                <p className="text-sm font-medium text-steel">{plan.name}</p>
                <p className="mt-2">
                  <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                  <span className="ml-1 text-sm text-cold">ISK</span>
                </p>
                <p className="mt-0.5 text-xs text-cold">
                  {plan.perMonth ? `${plan.perMonth} ISK / month` : `per ${plan.period}`}
                </p>

                {/* Selection indicator */}
                <div
                  className={`mt-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    isSelected ? "border-primary bg-primary" : "border-cold"
                  }`}
                >
                  {isSelected && <Check size={12} className="text-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Benefits */}
        <div className="mx-auto mt-10 max-w-md">
          <p className="text-center text-sm font-semibold uppercase tracking-wider text-cold">
            Every plan includes
          </p>
          <ul className="mt-4 space-y-3">
            {benefits.map((b) => (
              <li key={b.label} className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <b.icon size={16} className="text-primary" />
                </div>
                <span className="text-sm text-foreground">{b.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-10 max-w-md text-center">
          <Link to="/signup">
            <Button size="lg" className="w-full text-base">
              Get started — {selectedPlan.price} ISK
            </Button>
          </Link>
          <p className="mt-3 text-xs text-cold">
            Cancel anytime. No lock-in contracts.
          </p>
        </div>

        {/* Guarantee */}
        <div className="mx-auto mt-8 max-w-md rounded-lg border border-border bg-light-bg p-5 text-center">
          <p className="text-sm font-semibold text-foreground">14-day money-back guarantee</p>
          <p className="mt-1 text-xs text-steel">
            Not satisfied? Contact us within 14 days for a full refund — no questions asked.
          </p>
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
