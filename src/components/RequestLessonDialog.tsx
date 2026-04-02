import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Star,
  Clock,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Check,
  Send,
  MessageCircle,
  BookOpen,
  Search,
  MapPin,
  Video,
  Users,
  Calendar,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Tutor } from "@/data/tutors";

/* ─── Chip selector ─── */
const Chip = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-colors ${
      active
        ? "border-primary bg-primary/10 text-primary"
        : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
    }`}
  >
    {label}
  </button>
);

/* ─── Step indicator ─── */
const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }, (_, i) => (
      <div key={i} className="flex items-center gap-2">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
            i < current
              ? "bg-primary text-primary-foreground"
              : i === current
                ? "border-2 border-primary text-primary"
                : "border border-border text-muted-foreground"
          }`}
        >
          {i < current ? <Check className="h-3.5 w-3.5" /> : i + 1}
        </div>
        {i < total - 1 && (
          <div className={`h-px w-6 ${i < current ? "bg-primary" : "bg-border"}`} />
        )}
      </div>
    ))}
  </div>
);

/* ─── Tutor mini card ─── */
const TutorMiniCard = ({ tutor }: { tutor: Tutor }) => (
  <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
    <Avatar className="h-11 w-11 shrink-0">
      <AvatarImage src={tutor.photo} alt={tutor.name} />
      <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
        {tutor.name.split(" ").map((n) => n[0]).join("")}
      </AvatarFallback>
    </Avatar>
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold text-foreground">{tutor.name}</span>
        {tutor.verified && <BadgeCheck className="h-4 w-4 text-emerald-500" />}
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {tutor.rating}
          <span className="text-muted-foreground">({tutor.reviewCount})</span>
        </span>
        <span>{tutor.pricePerHour.toLocaleString()} ISK/hr</span>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════ */

interface RequestLessonDialogProps {
  tutor: Tutor;
  trigger?: React.ReactNode;
}

const subjects = [
  "Mathematics", "English", "Icelandic", "Danish", "Physics",
  "Chemistry", "Biology", "History", "Driving", "Piano", "Guitar",
];

const levels = ["Grunnskóli", "Menntaskóli", "Háskóli", "Adult learner"];
const formats = [
  { label: "Online", icon: Video },
  { label: "In person", icon: MapPin },
  { label: "Either", icon: Users },
];
const forWhom = ["Myself", "My child"];
const dayOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeOptions = ["Morning (9–12)", "Afternoon (12–16)", "Late afternoon (16–18)", "Evening (18–20)"];
const urgencyOptions = ["One-time help", "Exam preparation", "Weekly tutoring", "Ongoing support"];

const RequestLessonDialog = ({ tutor, trigger }: RequestLessonDialogProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  /* Form state */
  const [subject, setSubject] = useState(tutor.subjects[0] || "");
  const [level, setLevel] = useState("");
  const [forWho, setForWho] = useState("");
  const [format, setFormat] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [times, setTimes] = useState<string[]>([]);
  const [urgency, setUrgency] = useState("");
  const [message, setMessage] = useState("");

  const totalSteps = 5;

  const reset = () => {
    setStep(0);
    setSubject(tutor.subjects[0] || "");
    setLevel("");
    setForWho("");
    setFormat("");
    setDays([]);
    setTimes([]);
    setUrgency("");
    setMessage("");
  };

  const toggleArr = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const canProceed = () => {
    if (step === 0) return subject && level && forWho && format;
    if (step === 1) return days.length > 0 && times.length > 0;
    if (step === 2) return message.trim().length > 0;
    return true;
  };

  /* ─── Step content (inline JSX, not components, to preserve focus across re-renders) ─── */
  const step0 = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-foreground">Subject</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {tutor.subjects.map((s) => (
            <Chip key={s} label={s} active={subject === s} onClick={() => setSubject(s)} />
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <label className="text-xs font-semibold text-foreground">Student level</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {levels.map((l) => (
            <Chip key={l} label={l} active={level === l} onClick={() => setLevel(l)} />
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <label className="text-xs font-semibold text-foreground">Who is this lesson for?</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {forWhom.map((w) => (
            <Chip key={w} label={w} active={forWho === w} onClick={() => setForWho(w)} />
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <label className="text-xs font-semibold text-foreground">Lesson format</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {formats.map((f) => (
            <Chip key={f.label} label={f.label} active={format === f.label} onClick={() => setFormat(f.label)} />
          ))}
        </div>
      </div>
    </div>
  );

  const step1 = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-foreground">Preferred day(s)</label>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Select all that work for you</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {dayOptions.map((d) => (
            <Chip key={d} label={d} active={days.includes(d)} onClick={() => toggleArr(days, setDays, d)} />
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <label className="text-xs font-semibold text-foreground">Preferred time(s)</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {timeOptions.map((t) => (
            <Chip key={t} label={t} active={times.includes(t)} onClick={() => toggleArr(times, setTimes, t)} />
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <label className="text-xs font-semibold text-foreground">Type of support</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {urgencyOptions.map((u) => (
            <Chip key={u} label={u} active={urgency === u} onClick={() => setUrgency(u)} />
          ))}
        </div>
      </div>
    </div>
  );

  const step2 = (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-foreground">Message to {tutor.name.split(" ")[0]}</label>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Share what you need help with. The more detail you give, the better the teacher can prepare.
        </p>
        <Textarea
          className="mt-2 bg-background text-sm leading-relaxed"
          rows={5}
          placeholder={`e.g. "My daughter is in 9th grade and needs help preparing for a math exam in two weeks. She's struggling with algebra and equations."`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-muted/20 px-3 py-2.5">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Your message will be sent directly to {tutor.name.split(" ")[0]} through Kenna's secure messaging.
          There's no commitment until you both agree on the details.
        </p>
      </div>
    </div>
  );

  const step3 = (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-background p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Subject</span>
          <span className="text-sm font-medium text-foreground">{subject}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Level</span>
          <span className="text-sm font-medium text-foreground">{level}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">For</span>
          <span className="text-sm font-medium text-foreground">{forWho}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Format</span>
          <span className="text-sm font-medium text-foreground">{format}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Preferred days</span>
          <span className="text-sm font-medium text-foreground">{days.join(", ")}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Preferred times</span>
          <span className="text-sm font-medium text-foreground">{times.join(", ")}</span>
        </div>
        {urgency && (
          <>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Type</span>
              <span className="text-sm font-medium text-foreground">{urgency}</span>
            </div>
          </>
        )}
      </div>

      <div className="rounded-lg border border-border bg-background p-4">
        <p className="text-xs font-medium text-muted-foreground mb-1.5">Your message</p>
        <p className="text-sm text-foreground leading-relaxed">{message}</p>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-emerald-50/60 px-3 py-2.5">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
        <p className="text-[11px] text-emerald-700 leading-relaxed">
          No commitment until you and the tutor agree on the details. You can continue the conversation in messages.
        </p>
      </div>
    </div>
  );

  const step4 = (
    <div className="flex flex-col items-center text-center py-4">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-7 w-7 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">Request sent!</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
        Your lesson request has been sent to <strong>{tutor.name}</strong>. They typically respond within{" "}
        <strong>{tutor.responseTime}</strong>.
      </p>

      <div className="mt-5 w-full rounded-lg border border-border bg-background p-4 text-left">
        <p className="text-xs font-semibold text-foreground mb-2">What happens next</p>
        <div className="space-y-2.5">
          {[
            `${tutor.name.split(" ")[0]} will review your request and reply`,
            "You'll discuss details and agree on a time",
            "Once confirmed, the lesson will appear in your bookings",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-xs text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 w-full sm:flex-row sm:justify-center">
        <Link to="/messages">
          <Button className="w-full gap-1.5 sm:w-auto">
            <MessageCircle className="h-4 w-4" /> Go to messages
          </Button>
        </Link>
        <Link to="/browse">
          <Button variant="outline" className="w-full gap-1.5 sm:w-auto">
            <Search className="h-4 w-4" /> Browse more tutors
          </Button>
        </Link>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <ShieldCheck className="h-3 w-3" />
        Secure communication through Kenna
      </div>
    </div>
  );

  const stepTitles = [
    "Lesson details",
    "Scheduling preferences",
    "Message to teacher",
    "Review your request",
    "Request sent",
  ];

  const renderStep = () => {
    switch (step) {
      case 0: return step0;
      case 1: return step1;
      case 2: return step2;
      case 3: return step3;
      case 4: return step4;
      default: return null;
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setTimeout(reset, 300);
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full gap-2" size="lg">
            <Send className="h-4 w-4" /> Request a lesson
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border px-5 pt-5 pb-4">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              {step < 4 ? "Request a lesson" : ""}
            </DialogTitle>
          </DialogHeader>

          {step < 4 && (
            <div className="mt-3 flex items-center justify-between">
              <StepIndicator current={step} total={4} />
              <span className="text-xs text-muted-foreground">{stepTitles[step]}</span>
            </div>
          )}

          {step > 0 && step < 4 && (
            <div className="mt-3">
              <TutorMiniCard tutor={tutor} />
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-5 py-5">{renderStep()}</div>

        {/* Footer */}
        {step < 4 && (
          <div className="sticky bottom-0 border-t border-border bg-card px-5 py-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              disabled={step === 0}
              onClick={() => setStep((s) => s - 1)}
              className="gap-1 text-sm text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </Button>

            {step < 3 ? (
              <Button
                size="sm"
                disabled={!canProceed()}
                onClick={() => setStep((s) => s + 1)}
                className="gap-1 text-sm"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => setStep(4)}
                className="gap-1.5 text-sm"
              >
                <Send className="h-4 w-4" /> Send request
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestLessonDialog;
