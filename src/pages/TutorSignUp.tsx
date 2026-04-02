import { useState } from "react";
import {
  Check, ChevronRight, Mail, Clock, UserCheck, ArrowRight,
  FileText, ShieldCheck, Send, AlertCircle, Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

const allSubjects = [
  "Mathematics", "English", "Danish", "Physics",
  "Icelandic", "Chemistry", "Computer Science", "History",
];

const locations = [
  "Reykjavík", "Kópavogur", "Hafnarfjörður", "Garðabær",
  "Mosfellsbær", "Reykjanesbær", "Akureyri", "Selfoss", "Akranes", "Online only",
];

const availabilityOptions = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekends",
  "Flexible",
];

const formatOptions = ["Online", "In person", "Both"];

/* ── Shared input style ── */
const inputClass =
  "w-full rounded-lg border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary";

/* ── Application timeline shown in sidebar ── */
const timelineSteps = [
  { icon: Send, label: "Submit application", desc: "Fill in your details and submit" },
  { icon: ShieldCheck, label: "Identity verification", desc: "We verify your identity and credentials" },
  { icon: UserCheck, label: "Profile review", desc: "Our team reviews your qualifications" },
  { icon: Mail, label: "Receive login", desc: "Get an email with your login credentials" },
];

const TutorSignUp = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  /* ── Form state ── */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [rate, setRate] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);
  const [teachingFormat, setTeachingFormat] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [showOtherSubject, setShowOtherSubject] = useState(false);
  const [otherSubject, setOtherSubject] = useState("");

  const toggleSubject = (s: string) =>
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const toggleAvailability = (s: string) =>
    setAvailability((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* ── Validation ── */
  const step1Valid = name.trim() && email.trim() && /^\d{7}$/.test(phone.replace(/\s/g, "")) && location;
  const hasSubjects = subjects.length > 0 || (showOtherSubject && otherSubject.trim());
  const step2Valid = hasSubjects && rate && bio.trim() && availability.length > 0 && teachingFormat;

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const allSelectedSubjects = showOtherSubject && otherSubject.trim()
      ? [...subjects, otherSubject.trim()]
      : subjects;

    const { error } = await supabase.from("tutor_applications").insert({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      location,
      subjects: allSelectedSubjects,
      rate: Number(rate),
      bio: bio.trim(),
      experience: experience.trim() || null,
      education: education.trim() || null,
      availability,
      teaching_format: teachingFormat,
      status: "pending_review",
    });

    setSubmitting(false);

    if (error) {
      console.error("Supabase insert error:", error);
      if (error.code === "23505") {
        setSubmitError("An application with this email already exists. If you need to update your application, please contact us.");
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
      return;
    }

    setStep(4); // success screen
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-12">
        <div className="mx-auto max-w-4xl">

          {/* ── Header + Progress (hidden on success) ── */}
          {step <= totalSteps && (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                  Apply to teach on Kenna
                </h1>
                <p className="mt-2 text-steel">
                  This is an application, not a sign-up. Once approved, you'll receive login credentials by email.
                </p>
              </div>

              {/* Progress */}
              <div className="mx-auto mt-8 flex max-w-xs items-center justify-between">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                        s <= step
                          ? "bg-primary text-primary-foreground"
                          : "bg-light-bg text-cold"
                      }`}
                    >
                      {s < step ? <Check size={16} /> : s}
                    </div>
                    {s < totalSteps && (
                      <div
                        className={`mx-2 h-0.5 w-8 sm:w-12 ${
                          s < step ? "bg-primary" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ══════════════════════════════════════════ */}
          {/* SUCCESS PAGE                              */}
          {/* ══════════════════════════════════════════ */}
          {step === 4 ? (
            <div className="mx-auto mt-10 max-w-lg text-center">
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm md:p-10">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <Check size={40} className="text-green-600" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-foreground">
                  Application received!
                </h2>
                <p className="mt-3 text-steel">
                  Thank you for applying to teach on Kenna, {name.split(" ")[0]}. We'll review your application and get back to you by email.
                </p>

                {/* What happens next */}
                <div className="mt-8 space-y-4 text-left">
                  <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    What happens next
                  </h3>
                  <div className="flex items-start gap-4 rounded-lg border border-border bg-light-bg p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <ShieldCheck size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">We review your application</p>
                      <p className="mt-0.5 text-sm text-steel">
                        Our team checks your identity, qualifications, and teaching experience.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border border-border bg-light-bg p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <Mail size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">You receive your login</p>
                      <p className="mt-0.5 text-sm text-steel">
                        Once approved, we'll email you a link to set your password and access your teacher dashboard.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border border-border bg-light-bg p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                      <Clock size={20} className="text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Typical timeline</p>
                      <p className="mt-0.5 text-sm text-steel">
                        Most applications are reviewed within 1–2 business days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link to="/">
                    <Button size="lg">Back to home</Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (

          /* ══════════════════════════════════════════ */
          /* FORM + SIDEBAR                            */
          /* ══════════════════════════════════════════ */
          <div className="mt-10 flex flex-col gap-8 lg:flex-row">
            {/* ── Form card ── */}
            <div className="flex-1 rounded-lg border border-border bg-card p-6 shadow-sm">

              {/* ── Step 1: About you ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-foreground">About you</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Full name *</label>
                      <input
                        className={inputClass}
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Email *</label>
                      <input
                        type="email"
                        className={inputClass}
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Phone *</label>
                      <input
                        className={inputClass}
                        placeholder="e.g. 555 1234"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => setPhoneTouched(true)}
                      />
                      {phoneTouched && phone.trim() && !/^\d{7}$/.test(phone.replace(/\s/g, "")) && (
                        <p className="mt-1 text-xs text-red-500">Please enter a valid 7-digit phone number</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Location *</label>
                      <select
                        className={inputClass}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="">Select location...</option>
                        {locations.map((l) => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>
              )}

              {/* ── Step 2: Teaching details + availability ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="text-xl font-semibold text-foreground">Teaching details</h2>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      Subjects you teach * <span className="text-xs text-cold">(select all that apply)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {allSubjects.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleSubject(s)}
                          className={`rounded-full border px-3 py-1.5 text-sm transition ${
                            subjects.includes(s)
                              ? "border-primary bg-primary/10 font-medium text-primary"
                              : "border-border text-steel hover:bg-light-bg"
                          }`}
                        >
                          {subjects.includes(s) && <Check size={14} className="mr-1 inline" />}
                          {s}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setShowOtherSubject(!showOtherSubject)}
                        className={`rounded-full border px-3 py-1.5 text-sm transition ${
                          showOtherSubject
                            ? "border-primary bg-primary/10 font-medium text-primary"
                            : "border-border text-steel hover:bg-light-bg"
                        }`}
                      >
                        {showOtherSubject && <Check size={14} className="mr-1 inline" />}
                        Other
                      </button>
                    </div>
                    {showOtherSubject && (
                      <input
                        className={inputClass + " mt-2"}
                        placeholder="Enter subject name"
                        value={otherSubject}
                        onChange={(e) => setOtherSubject(e.target.value)}
                      />
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Hourly rate (ISK) *</label>
                      <input
                        type="number"
                        className={inputClass}
                        placeholder="e.g. 6000"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">Teaching format *</label>
                      <select
                        className={inputClass}
                        value={teachingFormat}
                        onChange={(e) => setTeachingFormat(e.target.value)}
                      >
                        <option value="">Select format...</option>
                        {formatOptions.map((f) => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">About you *</label>
                    <textarea
                      rows={4}
                      className={inputClass}
                      placeholder="Tell students about your teaching approach, background, and what makes you a great teacher..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Teaching experience (years) <span className="text-xs text-cold">optional</span>
                      </label>
                      <input
                        type="number"
                        className={inputClass}
                        placeholder="e.g. 3"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-foreground">
                        Education / qualifications <span className="text-xs text-cold">optional</span>
                      </label>
                      <input
                        className={inputClass}
                        placeholder="e.g. BSc in Mathematics"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">
                      General availability * <span className="text-xs text-cold">(select all that apply)</span>
                    </label>
                    <p className="mb-2 text-xs text-steel">You can discuss exact times with students later.</p>
                    <div className="flex flex-wrap gap-2">
                      {availabilityOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleAvailability(opt)}
                          className={`rounded-full border px-3 py-1.5 text-sm transition ${
                            availability.includes(opt)
                              ? "border-primary bg-primary/10 font-medium text-primary"
                              : "border-border text-steel hover:bg-light-bg"
                          }`}
                        >
                          {availability.includes(opt) && <Check size={14} className="mr-1 inline" />}
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Step 3: Review & submit ── */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-foreground">Review your application</h2>
                  <p className="text-sm text-steel">
                    Please review the details below. Once submitted, our team will review your application and contact you by email.
                  </p>

                  {/* Summary */}
                  <div className="space-y-4 rounded-lg border border-border bg-light-bg p-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase text-cold">Name</p>
                        <p className="text-sm text-foreground">{name || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-cold">Email</p>
                        <p className="text-sm text-foreground">{email || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-cold">Phone</p>
                        <p className="text-sm text-foreground">{phone || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-cold">Location</p>
                        <p className="text-sm text-foreground">{location || "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-cold">Hourly rate</p>
                        <p className="text-sm text-foreground">{rate ? `${Number(rate).toLocaleString()} ISK` : "—"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-cold">Format</p>
                        <p className="text-sm text-foreground">{teachingFormat || "—"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-cold">Subjects</p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {[...subjects, ...(showOtherSubject && otherSubject.trim() ? [otherSubject.trim()] : [])].length > 0
                          ? [...subjects, ...(showOtherSubject && otherSubject.trim() ? [otherSubject.trim()] : [])].map((s) => (
                              <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                {s}
                              </span>
                            ))
                          : <span className="text-sm text-steel">—</span>}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase text-cold">Availability</p>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {availability.length > 0
                          ? availability.map((a) => (
                              <span key={a} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                {a}
                              </span>
                            ))
                          : <span className="text-sm text-steel">—</span>}
                      </div>
                    </div>
                    {bio && (
                      <div>
                        <p className="text-xs font-semibold uppercase text-cold">About</p>
                        <p className="mt-0.5 text-sm text-steel">{bio}</p>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* Error message */}
              {submitError && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={16} className="shrink-0" />
                  {submitError}
                </div>
              )}

              {/* ── Navigation buttons ── */}
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                ) : (
                  <div />
                )}
                {step < totalSteps ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    className="gap-1"
                    disabled={
                      (step === 1 && !step1Valid) ||
                      (step === 2 && !step2Valid)
                    }
                  >
                    Next <ChevronRight size={16} />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={submitting} className="gap-1.5">
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                    ) : (
                      <><Send size={16} /> Submit application</>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* ── Sidebar: Application process ── */}
            <aside className="lg:w-72">
              <div className="rounded-lg border border-border bg-light-bg p-6">
                <h3 className="text-lg font-semibold text-foreground">How it works</h3>
                <p className="mt-1 text-xs text-steel">Application process</p>
                <ol className="mt-5 space-y-5">
                  {timelineSteps.map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                        <t.icon size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{t.label}</p>
                        <p className="mt-0.5 text-xs text-steel">{t.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Note */}
              <div className="mt-4 rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-2">
                  <FileText size={16} className="mt-0.5 shrink-0 text-cold" />
                  <p className="text-xs text-steel">
                    It's free to apply. Kenna does not charge teachers any fees. You set your own rates and keep your earnings.
                  </p>
                </div>
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
