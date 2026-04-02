import { useParams, Link } from "react-router-dom";
import { BadgeCheck, MapPin, Clock, ArrowLeft, Video, Users } from "lucide-react";
import RequestLessonDialog from "@/components/RequestLessonDialog";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { tutors } from "@/data/tutors";

const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dayLabels: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

const timeCategories = [
  { label: "Morning (9\u201312)", start: 9, end: 12 },
  { label: "Afternoon (12\u201316)", start: 12, end: 16 },
  { label: "Late afternoon (16\u201318)", start: 16, end: 18 },
  { label: "Evening (18\u201320)", start: 18, end: 20 },
];

/** Check if any availability slot overlaps with a time category */
const slotOverlaps = (slots: string[], catStart: number, catEnd: number) =>
  slots.some((slot) => {
    const [from, to] = slot.split("-").map((t) => parseInt(t.split(":")[0], 10));
    return from < catEnd && to > catStart;
  });

const formatLabel = (format: string) => {
  switch (format) {
    case "online": return "Online only";
    case "in-person": return "In person only";
    case "both": return "Online & in person";
    default: return format;
  }
};

const formatIcon = (format: string) => {
  switch (format) {
    case "online": return <Video size={14} />;
    case "in-person": return <MapPin size={14} />;
    case "both": return <Users size={14} />;
    default: return null;
  }
};

const TutorProfile = () => {
  const { id } = useParams();
  const tutor = tutors.find((t) => t.id === id);

  if (!tutor) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-lg text-muted-foreground">Tutor not found.</p>
          <Link to="/browse" className="mt-4 inline-block text-sm text-primary underline">
            Back to Browse
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container py-8">
        <Link to="/browse" className="mb-6 inline-flex items-center gap-1 text-sm text-steel hover:text-foreground">
          <ArrowLeft size={16} /> Back to results
        </Link>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <div className="flex-1 space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <img
                src={tutor.photo}
                alt={tutor.name}
                width={128}
                height={128}
                className="h-32 w-32 shrink-0 rounded-xl object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-foreground">{tutor.name}</h1>
                  {tutor.verified && <BadgeCheck size={24} className="text-primary" />}
                </div>
                <p className="mt-1 text-lg text-steel">{tutor.tagline}</p>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {tutor.location}</span>
                  <span>Member since {tutor.memberSince}</span>
                </div>
              </div>
            </div>

            {/* About */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">About me</h2>
              <p className="mt-3 leading-relaxed text-steel">{tutor.bio}</p>
            </section>

            {/* Subjects */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Subjects</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {[...new Set(tutor.subjectLevels.map((sl) => sl.subject))].map((subject) => (
                  <span key={subject} className="rounded-full bg-light-bg px-3 py-1.5 text-sm font-medium text-steel">
                    {subject}
                  </span>
                ))}
              </div>
            </section>

            {/* Levels */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Levels</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {[...new Set(tutor.subjectLevels.map((sl) => sl.level))].map((level) => (
                  <span key={level} className="rounded-full bg-light-bg px-3 py-1.5 text-sm font-medium text-steel">
                    {level}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Education & qualifications</h2>
              <ul className="mt-3 space-y-2">
                {tutor.education.map((e, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-steel">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {e}
                  </li>
                ))}
              </ul>
            </section>

            {/* Availability */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Availability</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Days</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dayOrder
                      .filter((day) => tutor.availability[day]?.length > 0)
                      .map((day) => (
                        <span key={day} className="rounded-full bg-light-bg px-3 py-1.5 text-sm font-medium text-steel">
                          {dayLabels[day]}
                        </span>
                      ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Times</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(() => {
                      const allSlots = Object.values(tutor.availability).flat();
                      return timeCategories
                        .filter((cat) => slotOverlaps(allSlots, cat.start, cat.end))
                        .map((cat) => (
                          <span key={cat.label} className="rounded-full bg-light-bg px-3 py-1.5 text-sm font-medium text-steel">
                            {cat.label}
                          </span>
                        ));
                    })()}
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">
                Reviews ({tutor.reviewCount})
              </h2>
              <div className="mt-4 space-y-4">
                {tutor.reviews.map((r, i) => (
                  <div key={i} className="rounded-lg border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.date}</p>
                    </div>
                    <div className="mt-1">
                      <StarRating rating={r.rating} size={14} />
                    </div>
                    <p className="mt-2 text-sm text-steel">{r.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky sidebar */}
          <aside className="lg:w-80">
            <div className="sticky top-24 space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">
                  {tutor.pricePerHour.toLocaleString()} ISK
                </p>
                <p className="text-sm text-muted-foreground">per hour</p>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-sm text-steel">
                {formatIcon(tutor.teachingFormat)}
                {formatLabel(tutor.teachingFormat)}
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                Responds in {tutor.responseTime}
              </div>
              <RequestLessonDialog tutor={tutor} />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorProfile;
