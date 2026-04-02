import { useParams, Link } from "react-router-dom";
import { BadgeCheck, MapPin, Clock, ArrowLeft } from "lucide-react";
import RequestLessonDialog from "@/components/RequestLessonDialog";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { tutors } from "@/data/tutors";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Hourly rate", value: `${tutor.pricePerHour.toLocaleString()} ISK` },
                { label: "Reviews", value: tutor.reviewCount.toString() },
                { label: "Rating", value: tutor.rating.toString() },
                { label: "Response time", value: tutor.responseTime },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-card p-4 text-center">
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            {/* About */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">About me</h2>
              <p className="mt-3 leading-relaxed text-steel">{tutor.bio}</p>
            </section>

            {/* Subjects */}
            <section>
              <h2 className="text-xl font-semibold text-foreground">Subjects I teach</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {tutor.subjectLevels.map((sl, i) => (
                  <span key={i} className="rounded-full bg-light-bg px-3 py-1.5 text-sm font-medium text-steel">
                    {sl.subject} — {sl.level}
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
              <div className="mt-3 grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <div key={day} className="text-center">
                    <p className="mb-2 text-xs font-semibold text-foreground">{day}</p>
                    {tutor.availability[day]?.length > 0 ? (
                      tutor.availability[day].map((slot, i) => (
                        <p key={i} className="rounded bg-light-bg px-1 py-1 text-xs text-steel">{slot}</p>
                      ))
                    ) : (
                      <p className="text-xs text-cold">—</p>
                    )}
                  </div>
                ))}
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
              <div className="flex justify-center">
                <StarRating rating={tutor.rating} count={tutor.reviewCount} />
              </div>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <Clock size={12} />
                Responds in {tutor.responseTime}
              </div>
              <Button className="w-full gap-2" size="lg">
                <Lock size={16} />
                Subscribe to connect
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Subscribe from 2,900 ISK/month to contact tutors
              </p>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorProfile;
