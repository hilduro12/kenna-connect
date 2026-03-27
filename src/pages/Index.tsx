import { Link } from "react-router-dom";
import { Search, ShieldCheck, BookOpen, Monitor, Star, Users, MessageCircle, ArrowRight, Lock, Radical, Car, Piano, Mic, Dumbbell, MessageSquare, Guitar, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TutorCard from "@/components/TutorCard";
import BlurredTutorCard from "@/components/BlurredTutorCard";
import { tutors } from "@/data/tutors";
import { useAuth } from "@/contexts/AuthContext";
import heroImg from "@/assets/hero-illustration.jpg";

const subjects = [
  "Mathematics", "English", "Danish", "Physics",
  "Icelandic", "Chemistry", "Computer Science", "History",
];

const steps = [
  { icon: Search, title: "Search", desc: "Browse teachers by subject, location, and price." },
  { icon: Users, title: "Connect", desc: "Subscribe to contact teachers directly." },
  { icon: BookOpen, title: "Learn", desc: "Meet online or in person and start improving." },
];

const benefits = [
  { icon: ShieldCheck, title: "Verified Teachers", desc: "Every teacher is reviewed and approved before joining the platform." },
  { icon: BookOpen, title: "All Subjects", desc: "From mathematics to music — find help in any subject area." },
  { icon: Monitor, title: "In-Person & Online", desc: "Learn face to face or from the comfort of your home." },
  { icon: Star, title: "Trusted Reviews", desc: "Read honest reviews from real students and parents." },
];

const testimonials = [
  { name: "Guðrún Helgadóttir", role: "Parent", quote: "Kenna made it so easy to find the right teacher for my daughter. Her math grades improved within weeks." },
  { name: "Eiríkur Magnússon", role: "University Student", quote: "I found an amazing physics teacher who helped me prepare for my final exams. The platform is simple and efficient." },
  { name: "Sarah Thompson", role: "Expat Parent", quote: "As a newcomer to Iceland, Kenna helped us find an Icelandic language teacher quickly. Highly recommended!" },
];

const Index = () => {
  const { isSubscribed } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-light-bg">
        <div className="container grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Find the teacher that's right for you
            </h1>
            <p className="max-w-lg text-lg text-steel">
              Iceland's marketplace for private tutoring — all subjects, all levels.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <select className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary sm:w-56">
                <option value="">Select a subject...</option>
                {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <Link to="/browse">
                <Button size="lg" className="gap-2"><Search size={18} /> Search</Button>
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img src={heroImg} alt="Students learning with a teacher" width={1280} height={720} className="rounded-xl" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold text-foreground">How it works</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="rounded-lg border border-border bg-card p-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <step.icon size={24} />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-steel">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular subjects */}
      <section className="bg-light-bg py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-bold text-foreground">Popular subjects</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {subjects.map((s) => (
              <Link key={s} to={`/browse?subject=${encodeURIComponent(s)}`} className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-steel transition-colors hover:bg-primary hover:text-primary-foreground">
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured teachers */}
      <section className="container py-16 md:py-20">
        {isSubscribed ? (
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
            <p className="mt-2 text-steel">Subscribe to see full profiles, contact teachers, and book lessons</p>
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

      {/* Why Kenna */}
      <section className="bg-light-bg py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-bold text-foreground">Why Kenna?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <div key={i} className="rounded-lg bg-background p-6 shadow-sm">
                <b.icon size={28} className="text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-steel">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16 md:py-20">
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
      <section className="bg-primary py-16 text-center text-primary-foreground">
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
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Become a Teacher
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
