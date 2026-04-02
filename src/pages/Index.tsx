import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, ShieldCheck, BookOpen, Monitor, Star, Users, MessageCircle,
  ArrowRight, Lock, BadgeCheck, Calculator, Globe,
  FlaskConical, Languages, Laptop, Pen, ChevronDown,
  GraduationCap, Atom,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TutorCard from "@/components/TutorCard";
import BlurredTutorCard from "@/components/BlurredTutorCard";
import { tutors } from "@/data/tutors";
import { useAuth } from "@/contexts/AuthContext";

const subjects = [
  { name: "Mathematics", icon: Calculator, color: "text-blue-600" },
  { name: "English", icon: Languages, color: "text-green-600" },
  { name: "Icelandic", icon: Globe, color: "text-sky-600" },
  { name: "Danish", icon: Pen, color: "text-teal-600" },
  { name: "Physics", icon: Atom, color: "text-indigo-600" },
  { name: "Chemistry", icon: FlaskConical, color: "text-purple-600" },
  { name: "Computer Science", icon: Laptop, color: "text-orange-600" },
  { name: "History", icon: GraduationCap, color: "text-violet-600" },
];

const steps = [
  { icon: Search, title: "Search", desc: "Browse teachers by subject, location, and price." },
  { icon: Users, title: "Connect", desc: "Subscribe to message teachers and request lessons." },
  { icon: BookOpen, title: "Learn", desc: "Meet online or in person and start improving." },
];

const benefits = [
  { icon: ShieldCheck, title: "Verified Teachers", desc: "Every teacher is reviewed and approved before joining the platform." },
  { icon: BookOpen, title: "All Subjects", desc: "From mathematics to science — find help in any subject area." },
  { icon: Monitor, title: "In-Person & Online", desc: "Learn face to face or from the comfort of your home." },
  { icon: Star, title: "Trusted Reviews", desc: "Read honest reviews from real students and parents." },
];

const testimonials = [
  { name: "Guðrún Helgadóttir", role: "Parent", quote: "Kenna made it so easy to find the right teacher for my daughter. Her math grades improved within weeks." },
  { name: "Eiríkur Magnússon", role: "University Student", quote: "I found an amazing physics teacher who helped me prepare for my final exams. The platform is simple and efficient." },
  { name: "Sarah Thompson", role: "Expat Parent", quote: "As a newcomer to Iceland, Kenna helped us find an Icelandic language teacher quickly. Highly recommended!" },
];

/* ── Hero: Journey Path ── */

const HeroJourneyPath = () => (
  <div className="flex w-[340px] flex-col items-center gap-0">
    {[
      { icon: Search, label: "Find your teacher", desc: "Browse by subject & location", color: "bg-blue-50 text-blue-600", borderColor: "border-blue-200" },
      { icon: MessageCircle, label: "Connect & chat", desc: "Message before you book", color: "bg-green-50 text-green-600", borderColor: "border-green-200" },
      { icon: BookOpen, label: "Start learning", desc: "Online or in person", color: "bg-purple-50 text-purple-600", borderColor: "border-purple-200" },
    ].map((step, i) => (
      <div key={i} className="flex flex-col items-center">
        {i > 0 && (
          <div className="flex h-10 flex-col items-center">
            <div className="h-full w-px border-l-2 border-dashed border-light-border" />
            <ChevronDown size={16} className="text-cold -mt-1" />
          </div>
        )}
        <div className={`flex w-[320px] items-center gap-4 rounded-xl border ${step.borderColor} bg-white p-5 shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md`}>
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${step.color}`}>
            <step.icon size={24} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{step.label}</p>
            <p className="mt-0.5 text-sm text-steel">{step.desc}</p>
          </div>
          {i === 2 && (
            <div className="shrink-0 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} size={10} className="fill-gold text-gold" />
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

/* ── Main component ── */

const Index = () => {
  const { hasStudentAccess } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-light-bg">
        <div className="container py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left — copy */}
            <div className="space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
                Find the teacher that's right for you
              </h1>
              <p className="max-w-lg text-lg text-steel">
                All subjects, all levels — online or in person.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="rounded-lg border border-light-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-cold focus:outline-none focus:ring-2 focus:ring-foreground sm:w-56"
                >
                  <option value="" className="text-cold">Select a subject...</option>
                  {subjects.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
                <Link to={selectedSubject ? `/browse?subject=${encodeURIComponent(selectedSubject)}` : "/browse"}>
                  <Button size="lg" className="gap-2 bg-primary text-white hover:bg-foreground"><Search size={18} /> Search</Button>
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {subjects.map((sub) => (
                  <Link
                    key={sub.name}
                    to={`/browse?subject=${encodeURIComponent(sub.name)}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white border border-light-border px-3.5 py-1.5 text-sm font-medium text-steel shadow-sm transition-all hover:shadow-md hover:border-primary hover:text-foreground"
                  >
                    <sub.icon size={14} className={sub.color} />
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — Journey Path hero */}
            <div className="hidden lg:flex lg:justify-center">
              <HeroJourneyPath />
            </div>
          </div>
        </div>
      </section>

      {/* Why Kenna */}
      <section className="container py-10 md:py-12">
        <h2 className="text-center text-3xl font-bold text-foreground">Why Kenna?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <div key={i} className="rounded-lg bg-background border border-border p-6 shadow-sm">
              <b.icon size={28} className="text-primary" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm text-steel">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured teachers */}
      <section className="container py-10 md:py-12">
        {hasStudentAccess ? (
          <>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-foreground">Featured teachers</h2>
              <Link to="/browse" className="flex items-center gap-1 text-sm font-medium text-steel hover:text-foreground">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {tutors.slice(0, 4).map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Discover 100+ teachers across Iceland</h2>
            <p className="mt-2 text-steel">Subscribe to see full profiles, message teachers, and request lessons.</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {tutors.slice(0, 4).map((tutor) => (
                <BlurredTutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
            <Link to="/pricing" className="mt-8 inline-block">
              <Button size="lg" className="gap-2">
                <Lock size={18} /> Subscribe to discover all teachers
              </Button>
            </Link>
          </div>
        )}
      </section>

      {/* Testimonials */}
      <section className="container py-10 md:py-12">
        <h2 className="text-center text-3xl font-bold text-foreground">What people say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <MessageCircle size={24} className="text-cold" />
              <p className="mt-4 text-sm italic text-steel">"{t.quote}"</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-10 md:py-12 text-center text-primary-foreground">
        <div className="container space-y-5">
          <h2 className="text-3xl font-bold">Ready to start learning?</h2>
          <p className="mx-auto max-w-md text-primary-foreground/80">
            Browse hundreds of qualified teachers across Iceland and find the perfect match.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/pricing">
              <Button variant="secondary" size="lg">Subscribe Now</Button>
            </Link>
            <Link to="/tutor-signup">
              <Button variant="secondary" size="lg">Start Teaching</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
