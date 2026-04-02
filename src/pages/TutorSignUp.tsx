import { useState } from "react";
import { Check, ChevronRight, Upload, Mail, Clock, UserCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const allSubjects = ["Mathematics", "English", "Danish", "Physics", "Icelandic", "Chemistry", "Computer Science", "History"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const benefits = [
  "Free to join",
  "Set your own rates",
  "Teach online or in-person",
  "Get discovered by students",
];

const TutorSignUp = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-12">
        <div className="mx-auto max-w-4xl">
          {step <= totalSteps && (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground md:text-4xl">Start teaching on Kenna</h1>
                <p className="mt-2 text-steel">It's free to create a profile. Reach students across Iceland.</p>
              </div>

              {/* Progress */}
              <div className="mx-auto mt-8 flex max-w-md items-center justify-between">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                        s <= step ? "bg-primary text-primary-foreground" : "bg-light-bg text-cold"
                      }`}
                    >
                      {s < step ? <Check size={16} /> : s}
                    </div>
                    {s < totalSteps && (
                      <div className={`mx-2 h-0.5 w-8 sm:w-12 ${s < step ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 5 ? (
            /* ── Success / Confirmation ── */
            <div className="mx-auto mt-10 max-w-lg text-center">
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm md:p-10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <Check size={40} className="text-green-600" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-foreground">Profile submitted!</h2>
                <p className="mt-3 text-steel">
                  Thank you for applying to teach on Kenna. Our team will review your profile and get back to you shortly.
                </p>

                {/* What happens next */}
                <div className="mt-8 space-y-4 text-left">
                  <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">What happens next</h3>
                  <div className="flex items-start gap-4 rounded-lg border border-border bg-light-bg p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <UserCheck size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Profile review</p>
                      <p className="mt-0.5 text-sm text-steel">Our team reviews your profile to ensure quality for students and parents.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border border-border bg-light-bg p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Mail size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Email confirmation</p>
                      <p className="mt-0.5 text-sm text-steel">You'll receive an email once your profile is approved and live on Kenna.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border border-border bg-light-bg p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <Clock size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Typical timeline</p>
                      <p className="mt-0.5 text-sm text-steel">Most profiles are reviewed within 1–2 business days.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link to="/">
                    <Button size="lg">Back to home</Button>
                  </Link>
                  <Link to="/browse">
                    <Button variant="outline" size="lg" className="gap-1.5">
                      Browse teachers <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
          <div className="mt-10 flex flex-col gap-8 lg:flex-row">
            {/* Form */}
            <div className="flex-1 rounded-lg border border-border bg-card p-6 shadow-sm">
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-foreground">Personal information</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Full name</label>
                      <input className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Email</label>
                      <input type="email" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@email.com" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Phone</label>
                      <input className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+354 ..." />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Location</label>
                      <select className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Reykjavik</option>
                        <option>Kopavogur</option>
                        <option>Hafnarfjordur</option>
                        <option>Akureyri</option>
                        <option>Online</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Profile photo</label>
                    <div className="flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary">
                      <div className="text-center text-muted-foreground">
                        <Upload size={24} className="mx-auto" />
                        <p className="mt-1 text-sm">Click to upload</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-foreground">Teaching details</h2>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Subjects (select all that apply)</label>
                    <div className="flex flex-wrap gap-2">
                      {allSubjects.map((s) => (
                        <label key={s} className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-steel transition hover:bg-light-bg">
                          <input type="checkbox" className="accent-primary" />
                          {s}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Hourly rate (ISK)</label>
                    <input type="number" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="6000" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">About you</label>
                    <textarea rows={4} className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Tell students about your experience and teaching style..." />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Experience (years)</label>
                    <input type="number" className="w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="3" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-foreground">Availability</h2>
                  <p className="text-sm text-steel">Select when you're generally available to teach.</p>
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => (
                      <div key={day} className="text-center">
                        <p className="mb-2 text-xs font-semibold text-foreground">{day}</p>
                        {["Morning", "Afternoon", "Evening"].map((time) => (
                          <label key={time} className="mb-1 flex cursor-pointer items-center justify-center rounded border border-border px-1 py-2 text-xs text-steel transition hover:bg-light-bg">
                            <input type="checkbox" className="sr-only" />
                            {time.slice(0, 3)}
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check size={32} />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">Review & submit</h2>
                  <p className="text-steel">
                    Review your information above, then submit your profile for approval. You'll be notified by email once your profile is live.
                  </p>
                </div>
              )}

              {step <= totalSteps && (
                <div className="mt-8 flex justify-between">
                  {step > 1 ? (
                    <Button variant="outline" onClick={() => setStep(step - 1)}>
                      Back
                    </Button>
                  ) : <div />}
                  {step < totalSteps ? (
                    <Button onClick={() => setStep(step + 1)} className="gap-1">
                      Next <ChevronRight size={16} />
                    </Button>
                  ) : (
                    <Button onClick={() => setStep(5)}>Submit Profile</Button>
                  )}
                </div>
              )}
            </div>

            {/* Benefits sidebar */}
            <aside className="lg:w-72">
              <div className="rounded-lg border border-border bg-light-bg p-6">
                <h3 className="text-lg font-semibold text-foreground">Why teach on Kenna?</h3>
                <ul className="mt-4 space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-steel">
                      <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorSignUp;
