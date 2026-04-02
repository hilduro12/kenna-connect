import { Link } from "react-router-dom";
import {
  Calendar,
  Search,
  MessageCircle,
  Clock,
  BookOpen,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { useAuth } from "@/contexts/AuthContext";
import { tutors } from "@/data/tutors";

const upcomingBookings = [
  {
    id: "b1",
    tutorId: "1",
    tutorName: "Anna Sigurdsdóttir",
    tutorPhoto: tutors[0].photo,
    subject: "Mathematics",
    date: "Mon, Apr 7",
    time: "16:00 – 17:00",
    location: "Reykjavik",
    status: "confirmed" as const,
  },
  {
    id: "b2",
    tutorId: "2",
    tutorName: "Bjarki Þórsson",
    tutorPhoto: tutors[1].photo,
    subject: "English",
    date: "Wed, Apr 9",
    time: "17:00 – 18:00",
    location: "Online",
    status: "pending" as const,
  },
];

const recentMessages = [
  {
    id: "m1",
    tutorName: "Anna Sigurdsdóttir",
    tutorPhoto: tutors[0].photo,
    preview: "See you Monday at 4! Bring your textbook.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "m2",
    tutorName: "Bjarki Þórsson",
    tutorPhoto: tutors[1].photo,
    preview: "I've confirmed the time. Looking forward to it.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "m3",
    tutorName: "Sofia Hernandez",
    tutorPhoto: tutors[4].photo,
    preview: "Thanks for the great lesson! Here are the notes.",
    time: "3 days ago",
    unread: false,
  },
];

const savedTutors = [tutors[2], tutors[3], tutors[5]];

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-light-bg">
      <Navbar />

      <div className="container py-8 md:py-12">
        {/* Welcome header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-steel">
            Here's what's happening with your lessons.
          </p>
        </div>

        {/* Quick actions */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Link
            to="/browse"
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Search size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground">Find a teacher</p>
              <p className="text-sm text-steel">Browse all subjects</p>
            </div>
          </Link>
          <Link
            to="/messages"
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground">Messages</p>
              <p className="text-sm text-steel">1 unread message</p>
            </div>
          </Link>
          <Link
            to="/bookings"
            className="flex items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Calendar size={20} />
            </div>
            <div>
              <p className="font-semibold text-foreground">My bookings</p>
              <p className="text-sm text-steel">2 upcoming lessons</p>
            </div>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Upcoming bookings */}
            <section>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  Upcoming lessons
                </h2>
                <Link
                  to="/bookings"
                  className="flex items-center gap-1 text-sm font-medium text-steel hover:text-foreground"
                >
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm"
                  >
                    <img
                      src={booking.tutorPhoto}
                      alt={booking.tutorName}
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/tutor/${booking.tutorId}`}
                          className="font-semibold text-foreground hover:text-steel"
                        >
                          {booking.tutorName}
                        </Link>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {booking.status === "confirmed"
                            ? "Confirmed"
                            : "Pending"}
                        </span>
                      </div>
                      <p className="text-sm text-steel">{booking.subject}</p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <Calendar size={14} />
                        {booking.date}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-sm text-steel">
                        <Clock size={14} />
                        {booking.time}
                      </div>
                    </div>
                    <div className="text-right sm:hidden">
                      <p className="text-sm font-medium text-foreground">
                        {booking.date}
                      </p>
                      <p className="text-xs text-steel">{booking.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Saved tutors */}
            <section>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  Saved teachers
                </h2>
                <Link
                  to="/browse"
                  className="flex items-center gap-1 text-sm font-medium text-steel hover:text-foreground"
                >
                  Browse more <ArrowRight size={14} />
                </Link>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {savedTutors.map((tutor) => (
                  <Link
                    key={tutor.id}
                    to={`/tutor/${tutor.id}`}
                    className="group rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={tutor.photo}
                        alt={tutor.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground group-hover:text-steel">
                          {tutor.name}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={12} />
                          {tutor.location}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {tutor.subjects.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-light-bg px-2 py-0.5 text-xs font-medium text-steel"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <StarRating
                        rating={tutor.rating}
                        count={tutor.reviewCount}
                        size={14}
                      />
                      <span className="text-sm font-bold text-foreground">
                        {tutor.pricePerHour.toLocaleString()}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          ISK/hr
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent messages */}
            <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-foreground">Messages</h3>
                <Link
                  to="/messages"
                  className="text-sm font-medium text-steel hover:text-foreground"
                >
                  See all
                </Link>
              </div>
              <div className="mt-4 space-y-4">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <img
                      src={msg.tutorPhoto}
                      alt={msg.tutorName}
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`truncate text-sm ${
                            msg.unread
                              ? "font-bold text-foreground"
                              : "font-medium text-foreground"
                          }`}
                        >
                          {msg.tutorName}
                        </p>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {msg.time}
                        </span>
                      </div>
                      <p
                        className={`truncate text-sm ${
                          msg.unread ? "font-medium text-steel" : "text-cold"
                        }`}
                      >
                        {msg.preview}
                      </p>
                    </div>
                    {msg.unread && (
                      <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
