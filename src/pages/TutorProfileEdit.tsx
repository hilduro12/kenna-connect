import { useState } from "react";
import {
  Camera,
  Eye,
  Save,
  BadgeCheck,
  GraduationCap,
  ShieldCheck,
  FileCheck,
  Star,
  MapPin,
  Clock,
  Video,
  Users,
  BookOpen,
  Plus,
  X,
  ChevronDown,
  Pause,
  ExternalLink,
  Info,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ─── Section card ─── */
const Section = ({
  title,
  description,
  badge,
  children,
}: {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
      </div>
      {badge}
    </div>
    {children}
  </div>
);

/* ─── Chip selector ─── */
const ChipSelector = ({
  items,
  selected,
  onToggle,
}: {
  items: string[];
  selected: string[];
  onToggle: (item: string) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => {
      const active = selected.includes(item);
      return (
        <button
          key={item}
          onClick={() => onToggle(item)}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            active
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
          }`}
        >
          {item}
        </button>
      );
    })}
  </div>
);

/* ─── Availability day row ─── */
const DayRow = ({
  day,
  slots,
  enabled,
  onToggle,
}: {
  day: string;
  slots: string;
  enabled: boolean;
  onToggle: () => void;
}) => (
  <div className="flex items-center justify-between py-2.5">
    <div className="flex items-center gap-3">
      <Switch checked={enabled} onCheckedChange={onToggle} />
      <span className={`text-sm font-medium ${enabled ? "text-foreground" : "text-muted-foreground"}`}>
        {day}
      </span>
    </div>
    {enabled && <span className="text-xs text-muted-foreground">{slots}</span>}
  </div>
);

/* ─── Verification status row ─── */
const VerifyRow = ({
  icon: Icon,
  label,
  status,
  done,
  action,
}: {
  icon: React.ElementType;
  label: string;
  status: string;
  done: boolean;
  action?: string;
}) => (
  <div className="flex items-center justify-between gap-4 py-3">
    <div className="flex items-center gap-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${done ? "bg-emerald-50" : "bg-amber-50"}`}>
        <Icon className={`h-4 w-4 ${done ? "text-emerald-600" : "text-amber-600"}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <span className={`text-xs font-medium ${done ? "text-emerald-600" : "text-amber-600"}`}>{status}</span>
      </div>
    </div>
    {action && (
      <Button size="sm" variant="outline" className="text-xs shrink-0">
        {action}
      </Button>
    )}
  </div>
);

/* ═══════════════════════════════════ */

const allSubjects = [
  "Mathematics", "English", "Icelandic", "Danish", "Physics",
  "Chemistry", "Biology", "History", "Computer Science", "Piano",
  "Guitar", "Singing", "Driving", "Photography", "Personal Training",
];

const allLevels = ["Grunnskóli", "Menntaskóli", "Háskóli", "Adult learners"];

const allSpecializations = [
  "Exam preparation", "Homework help", "Conversation practice",
  "Weekly tutoring", "Intensive courses", "Summer programmes",
];

const TutorProfileEdit = () => {
  /* ─── State ─── */
  const [subjects, setSubjects] = useState(["Mathematics", "Physics", "Chemistry"]);
  const [levels, setLevels] = useState(["Grunnskóli", "Menntaskóli"]);
  const [specializations, setSpecializations] = useState(["Exam preparation", "Weekly tutoring"]);
  const [teachOnline, setTeachOnline] = useState(true);
  const [teachInPerson, setTeachInPerson] = useState(true);
  const [availability, setAvailability] = useState({
    Mon: true, Tue: true, Wed: true, Thu: true, Fri: true, Sat: false, Sun: false,
  });

  const completeness = 82;

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {/* ═══ Top bar ═══ */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">Edit Profile</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                A complete profile helps parents and students find and trust you.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-1.5 text-sm">
                <Eye className="h-4 w-4" /> Preview
              </Button>
              <Button className="gap-1.5 text-sm">
                <Save className="h-4 w-4" /> Save changes
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* ═══ LEFT COLUMN ═══ */}
            <div className="space-y-6">
              {/* 1 — Profile header card */}
              <Section title="Profile header">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative shrink-0">
                    <Avatar className="h-20 w-20">
                      <AvatarFallback className="bg-primary/10 text-xl font-semibold text-primary">
                        EJ
                      </AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-primary text-primary-foreground shadow-sm">
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="text-xs font-medium text-foreground">Full name</label>
                      <Input defaultValue="Eiríkur Jónsson" className="mt-1.5 bg-background" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground">Headline</label>
                      <Input
                        defaultValue="Experienced math & science teacher — exam prep specialist"
                        className="mt-1.5 bg-background"
                      />
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        A clear headline helps parents understand what you offer at a glance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="Reykjavík" className="h-8 w-40 bg-background text-sm" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Avg. response: <strong className="text-foreground">2 hours</strong></span>
                  </div>
                </div>

                {/* Teaching mode */}
                <div className="mt-5 flex flex-wrap gap-4">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <Switch checked={teachOnline} onCheckedChange={setTeachOnline} />
                    <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Video className="h-4 w-4 text-muted-foreground" /> Online
                    </span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <Switch checked={teachInPerson} onCheckedChange={setTeachInPerson} />
                    <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      <Users className="h-4 w-4 text-muted-foreground" /> In person
                    </span>
                  </label>
                </div>
              </Section>

              {/* 2 — About / bio */}
              <Section
                title="About you"
                description="Tell parents and students what makes you a great teacher."
              >
                <Textarea
                  rows={6}
                  defaultValue="I've been teaching mathematics and science for over 8 years, working with students from grunnskóli through menntaskóli. I specialise in making complex topics feel approachable and building confidence before exams. My approach is patient, structured, and focused on understanding — not just memorising. I've helped dozens of students improve their grades and enjoy learning again."
                  className="bg-background text-sm leading-relaxed"
                />
                <div className="mt-2 flex items-start gap-1.5 text-[11px] text-muted-foreground">
                  <Info className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>
                    Describe your teaching style, experience, and what kinds of students you work best with.
                    Parents want to feel confident they're choosing the right tutor.
                  </span>
                </div>
              </Section>

              {/* 3 — Subjects & levels */}
              <Section
                title="Subjects & levels"
                description="Select the subjects and school levels you teach."
              >
                <div className="space-y-5">
                  <div>
                    <label className="text-xs font-medium text-foreground">Subjects</label>
                    <div className="mt-2">
                      <ChipSelector
                        items={allSubjects}
                        selected={subjects}
                        onToggle={(s) => toggle(subjects, setSubjects, s)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-xs font-medium text-foreground">School levels</label>
                    <div className="mt-2">
                      <ChipSelector
                        items={allLevels}
                        selected={levels}
                        onToggle={(l) => toggle(levels, setLevels, l)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className="text-xs font-medium text-foreground">Specializations</label>
                    <div className="mt-2">
                      <ChipSelector
                        items={allSpecializations}
                        selected={specializations}
                        onToggle={(sp) => toggle(specializations, setSpecializations, sp)}
                      />
                    </div>
                  </div>
                </div>
              </Section>

              {/* 4 — Pricing */}
              <Section
                title="Pricing"
                description="Set your hourly rate. Clear pricing builds trust."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-foreground">Hourly rate (ISK)</label>
                    <Input defaultValue="7.500" className="mt-1.5 bg-background" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">First lesson rate (optional)</label>
                    <Input defaultValue="5.000" placeholder="e.g. intro rate" className="mt-1.5 bg-background" />
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-1.5 text-[11px] text-muted-foreground">
                  <Info className="mt-0.5 h-3 w-3 shrink-0" />
                  <span>
                    Offering a reduced intro rate can help new students try a lesson with you.
                  </span>
                </div>
              </Section>

              {/* 5 — Availability */}
              <Section
                title="Availability"
                description="Let students know when you're generally available."
              >
                <div className="divide-y divide-border">
                  {(Object.keys(availability) as (keyof typeof availability)[]).map((day) => (
                    <DayRow
                      key={day}
                      day={
                        { Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" }[day]
                      }
                      slots={
                        { Mon: "15:00 – 20:00", Tue: "15:00 – 20:00", Wed: "14:00 – 19:00", Thu: "15:00 – 20:00", Fri: "14:00 – 18:00", Sat: "10:00 – 14:00", Sun: "—" }[day]
                      }
                      enabled={availability[day]}
                      onToggle={() => setAvailability((a) => ({ ...a, [day]: !a[day] }))}
                    />
                  ))}
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  You can discuss exact times with students through messages.
                </p>
              </Section>

              {/* 6 — Education & qualifications */}
              <Section
                title="Education & qualifications"
                description="Credentials help parents feel confident."
              >
                <div className="space-y-4">
                  <div className="rounded-lg border border-border bg-background p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">BSc Mathematics</p>
                        <p className="text-xs text-muted-foreground">University of Iceland · 2014 – 2017</p>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 text-[11px]">Verified</Badge>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Teaching Certificate</p>
                        <p className="text-xs text-muted-foreground">Kennaraháskóli Íslands · 2018</p>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700 text-[11px]">Verified</Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Plus className="h-3.5 w-3.5" /> Add qualification
                  </Button>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-medium text-foreground">Years of teaching experience</label>
                      <Input defaultValue="8" className="mt-1.5 bg-background" />
                    </div>
                  </div>
                </div>
              </Section>

              {/* 7 — Trust & verification */}
              <Section
                title="Trust & verification"
                description="These badges appear on your public profile and help parents trust you."
                badge={
                  <Badge className="bg-emerald-100 text-emerald-700 text-[11px]">4 of 5 complete</Badge>
                }
              >
                <div className="divide-y divide-border">
                  <VerifyRow icon={BadgeCheck} label="Identity verified" status="Verified" done />
                  <VerifyRow icon={GraduationCap} label="Education verified" status="Verified" done />
                  <VerifyRow icon={ShieldCheck} label="Child safety check" status="Approved" done />
                  <VerifyRow icon={FileCheck} label="Background check" status="Completed" done />
                  <VerifyRow icon={Star} label="Profile reviewed by Kenna" status="Pending review" done={false} action="Request review" />
                </div>
              </Section>

              {/* Actions footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" className="gap-1.5 text-sm text-muted-foreground">
                    <Pause className="h-4 w-4" /> Pause profile
                  </Button>
                  <Button variant="ghost" className="text-sm text-muted-foreground">
                    Cancel
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="gap-1.5 text-sm">
                    <Eye className="h-4 w-4" /> Preview
                  </Button>
                  <Button className="gap-1.5 text-sm">
                    <Save className="h-4 w-4" /> Save changes
                  </Button>
                </div>
              </div>
            </div>

            {/* ═══ RIGHT COLUMN — Preview panel ═══ */}
            <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
              {/* Completeness card */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Profile completeness</h3>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="h-2.5 rounded-full bg-muted/40">
                      <div
                        className="h-2.5 rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${completeness}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-bold text-foreground">{completeness}%</span>
                </div>
                <p className="mt-2.5 text-xs text-muted-foreground">
                  Complete your profile to appear higher in search results and build more trust with parents.
                </p>
                <div className="mt-3 space-y-1.5">
                  <p className="flex items-center gap-1.5 text-xs text-amber-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Add a profile photo
                  </p>
                  <p className="flex items-center gap-1.5 text-xs text-amber-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Request Kenna profile review
                  </p>
                </div>
              </div>

              {/* Public preview card */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">What parents see</h3>
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground">
                    <ExternalLink className="h-3 w-3" /> Preview
                  </Button>
                </div>

                <div className="rounded-lg border border-border bg-background p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                        EJ
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-foreground">Eiríkur Jónsson</span>
                        <BadgeCheck className="h-4 w-4 text-emerald-500" />
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        Experienced math & science tutor
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {subjects.slice(0, 3).map((s) => (
                      <span key={s} className="rounded-full bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary">
                        {s}
                      </span>
                    ))}
                    {subjects.length > 3 && (
                      <span className="text-[11px] text-muted-foreground">+{subjects.length - 3}</span>
                    )}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-foreground">4.9</span>
                      <span className="text-[11px] text-muted-foreground">(24)</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">7.500 ISK<span className="text-[11px] font-normal text-muted-foreground">/hr</span></span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      <GraduationCap className="h-3 w-3" /> BSc Maths
                    </span>
                  </div>
                </div>
              </div>

              {/* Profile status */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-semibold text-foreground">Profile status</h3>
                <div className="mt-3 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium text-foreground">Active</span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Your profile is visible to students and parents in search results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TutorProfileEdit;
