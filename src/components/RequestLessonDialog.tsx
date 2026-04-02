import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Star,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Check,
  Send,
  MessageCircle,
  Search,
  MapPin,
  Video,
  Users,
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

/* ═══════════════════════════════════ */

interface RequestLessonDialogProps {
  tutor: Tutor;
  trigger?: React.ReactNode;
}

const levels = ["Grunnskóli", "Menntaskóli", "Háskóli", "Adult learner"];
const formats = [
  { label: "Online", icon: Video },
  { label: "In person", icon: MapPin },
  { label: "Either", icon: Users },
];
const forWhom = ["Myself", "My child"];
const timeOptions = ["Weekday mornings", "Weekday afternoons", "Weekday evenings", "Weekends", "Flexible"];

const RequestLessonDialog = ({ tutor, trigger }: RequestLessonDialogProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  /* Form state */
  const [subject, setSubject] = useState(tutor.subjects[0] || "");
  const [level, setLevel] = useState("");
  const [forWho, setForWho] = useState("");
  const [format, setFormat] = useState("");
  const [times, setTimes] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  const reset = () => {
    setStep(0);
    setSubject(tutor.subjects[0] || "");
    setLevel("");
    setForWho("");
    setFormat("");
    setTimes([]);
    setMessage("");
  };

  const toggleTime = (val: string) => {
    setTimes((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));
  };

  const canProceed = () => {
    if (step === 0) return subject && level && forWho && format;
    if (step === 1) return times.length > 0;
    if (step === 2) return message.trim().length > 0;
    return true;
  };

  /* ─── Step 1: Lesson basics ─── */
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
        <label className="text-xs font-semibold text-foreground">Level</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {levels.map((l) => (
            <Chip key={l} label={l} active={level === l} onClick={() => setLevel(l)} />
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <label className="text-xs font-semibold text-foreground">This is for</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {forWhom.map((w) => (
            <Chip key={w} label={w} active={forWho === w} onClick={() => setForWho(w)} />
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <label className="text-xs font-semibold text-foreground">Format</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {formats.map((f) => (
            <Chip key={f.label} label={f.label} active={format === f.label} onClick={() => setFormat(f.label)} />
          ))}
        </div>
      </div>
    </div>
  );

  /* ─── Step 2: Timing ─── */
  const step1 = (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-semibold text-foreground">When works for you?</label>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Select all that apply — you'll agree on exact times with the teacher.</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {timeOptions.map((t) => (
            <Chip key={t} label={t} active={times.includes(t)} onClick={() => toggleTime(t)} />
          ))}
        </div>
      </div>
    </div>
  );

  /* ─── Step 3: Message + send ─── */
  const step2 = (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-semibold text-foreground">Message to {tutor.name.split(" ")[0]}</label>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Briefly describe what you need help with.
        </p>
        <Textarea
          className="mt-2 bg-background text-sm leading-relaxed"
          rows={4}
          placeholder={`e.g. "I need help preparing for a math exam in two weeks — struggling with algebra and equations."`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-muted/20 px-3 py-2.5">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          No commitment — {tutor.name.split(" ")[0]} will reply and you can discuss details before agreeing to anything.
        </p>
      </div>
    </div>
  );

  /* ─── Success ─── */
  const step3 = (
    <div className="flex flex-col items-center text-center py-4">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <Check className="h-7 w-7 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">Request sent!</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground leading-relaxed">
        {tutor.name.split(" ")[0]} typically responds within <strong>{tutor.responseTime}</strong>.
        You'll continue the conversation in messages.
      </p>

      <div className="mt-6 flex flex-col gap-2 w-full sm:flex-row sm:justify-center">
        <Link to="/messages">
          <Button className="w-full gap-1.5 sm:w-auto">
            <MessageCircle className="h-4 w-4" /> Go to messages
          </Button>
        </Link>
        <Link to="/browse">
          <Button variant="outline" className="w-full gap-1.5 sm:w-auto">
            <Search className="h-4 w-4" /> Browse more teachers
          </Button>
        </Link>
      </div>
    </div>
  );

  const stepTitles = [
    "Lesson basics",
    "Timing",
    "Your message",
  ];

  const renderStep = () => {
    switch (step) {
      case 0: return step0;
      case 1: return step1;
      case 2: return step2;
      case 3: return step3;
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
              {step < 3 ? "Request a lesson" : ""}
            </DialogTitle>
          </DialogHeader>

          {step < 3 && (
            <div className="mt-3 flex items-center justify-between">
              <StepIndicator current={step} total={3} />
              <span className="text-xs text-muted-foreground">{stepTitles[step]}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="px-5 py-5">{renderStep()}</div>

        {/* Footer */}
        {step < 3 && (
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

            {step < 2 ? (
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
                disabled={!canProceed()}
                onClick={() => setStep(3)}
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
