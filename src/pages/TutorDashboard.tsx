import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  XCircle,
  DollarSign,
  Users,
  BookOpen,
  Edit,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { tutors } from "@/data/tutors";

const studentRequests = [
  {
    id: "r1",
    studentName: "Guðrún Helgadóttir",
    subject: "Mathematics",
    date: "Tue, Apr 8",
    time: "16:00 – 17:00",
    message: "My daughter needs help preparing for her final exam in two weeks.",
    sentAgo: "3 hours ago",
  },
  {
    id: "r2",
    studentName: "Ólafur Kristjánsson",
    subject: "Physics",
    date: "Thu, Apr 10",
    time: "18:00 – 19:00",
    message: "I'm struggling with mechanics and need weekly sessions.",
    sentAgo: "1 day ago",
  },
];

const upcomingLessons = [
  {
    id: "l1",
    studentName: "Bergþóra Ásgeirsdóttir",
    subject: "Chemistry",
    date: "Mon, Apr 7",
    time: "14:00 – 15:00",
    location: "Hafnarfjordur",
  },
  {
    id: "l2",
    studentName: "Finnur Gunnarsson",
    subject: "Chemistry",
    date: "Mon, Apr 7",
    time: "15:30 – 16:30",
    location: "Online",
  },
  {
    id: "l3",
    studentName: "Hanna Þórhallsdóttir",
    subject: "Physics",
    date: "Tue, Apr 8",
    time: "14:00 – 15:00",
    location: "Hafnarfjordur",
  },
];

const recentMessages = [
  {
    id: "m1",
    name: "Bergþóra Ásgeirsdóttir",
    preview: "Great, see you Monday!",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "m2",
    name: "Guðrún Helgadóttir",
    preview: "Would Tuesday at 4 work for you?",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: "m3",
    name: "Finnur Gunnarsson",
    preview: "Thanks for the extra notes, very helpful!",
    time: "Yesterday",
    unread: false,
  },
];

const earnings = {
  thisMonth: 156000,
  lastMonth: 143000,
  lessonsThisMonth: 24,
  totalStudents: 8,
};

const TutorDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";

  // Use tutor data for profile completeness demo
  const profileComplete = 4;
  const profileTotal = 5;

  return (
    <div className="min-h-screen bg-light-bg">
      <Navbar />

      <div className="container py-8 md:py-12">
        {/* Welcome header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {firstName}
            </h1>
            <p className="mt-1 text-steel">
              Here's your teaching overview.
            </p>
          </div>
          <Link to="/tutor-profile-edit">
            <Button variant="outline" size="sm" className="gap-2 text-steel">
              <Edit size={16} /> Edit profile
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <DollarSign size={20} className="text-green-700" />
              </div>
              <div>
                <p className="text-sm text-steel">This month</p>
                <p className="text-xl font-bold text-foreground">
                  {earnings.thisMonth.toLocaleString()} ISK
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <BookOpen size={20} className="text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-steel">Lessons this month</p>
                <p className="text-xl font-bold text-foreground">
                  {earnings.lessonsThisMonth}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Users size={20} className="text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-steel">Active students</p>
                <p className="text-xl font-bold text-foreground">
                  {earnings.totalStudents}
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                <Calendar size={20} className="text-yellow-700" />
              </div>
              <div>
                <p className="text-sm text-steel">Last month</p>
                <p className="text-xl font-bold text-foreground">
                  {earnings.lastMonth.toLocaleString()} ISK
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-8 lg:col-span-2">
            {/* New requests */}
            <section>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">
                  New requests
                  <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {studentRequests.length}
                  </span>
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                {studentRequests.map((req) => (
                  <div
                    key={req.id}
                    className="rounded-lg border border-border bg-card p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">
                            {req.studentName}
                          </p>
                          <span className="rounded-full bg-light-bg px-2.5 py-0.5 text-xs font-medium text-steel">
                            {req.subject}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-steel">{req.message}</p>
                        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> {req.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {req.time}
                          </span>
                          <span className="text-xs">{req.sentAgo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="gap-1.5">
                        <CheckCircle size={14} /> Accept
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 text-steel"
                      >
                        <MessageCircle size={14} /> Message
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5 text-muted-foreground hover:text-destructive"
                      >
                        <XCircle size={14} /> Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming lessons */}
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
                {upcomingLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {lesson.studentName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground">
                        {lesson.studentName}
                      </p>
                      <p className="text-sm text-steel">{lesson.subject}</p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                        <Calendar size={14} />
                        {lesson.date}
                      </div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-sm text-steel">
                        <Clock size={14} />
                        {lesson.time}
                      </div>
                    </div>
                    <div className="text-right sm:hidden">
                      <p className="text-sm font-medium text-foreground">
                        {lesson.date}
                      </p>
                      <p className="text-xs text-steel">{lesson.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Messages */}
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
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`truncate text-sm ${
                            msg.unread
                              ? "font-bold text-foreground"
                              : "font-medium text-foreground"
                          }`}
                        >
                          {msg.name}
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

            {/* Profile completeness */}
            <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
              <h3 className="font-bold text-foreground">Profile completeness</h3>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-steel">
                    {profileComplete} of {profileTotal} completed
                  </span>
                  <span className="font-medium text-foreground">
                    {Math.round((profileComplete / profileTotal) * 100)}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-light-bg">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${(profileComplete / profileTotal) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2.5">
                {[
                  { label: "Profile photo", done: true },
                  { label: "Bio & experience", done: true },
                  { label: "Subjects & pricing", done: true },
                  { label: "Availability", done: true },
                  { label: "Education & qualifications", done: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-sm"
                  >
                    {item.done ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <AlertCircle size={16} className="text-yellow-600" />
                    )}
                    <span
                      className={
                        item.done ? "text-steel" : "font-medium text-foreground"
                      }
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/tutor-profile-edit">
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4 w-full text-steel"
                >
                  Complete profile
                </Button>
              </Link>
            </section>

            {/* Availability reminder */}
            <section className="rounded-lg border border-border bg-primary/5 p-5">
              <div className="flex items-start gap-3">
                <Calendar size={20} className="mt-0.5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Update your availability
                  </p>
                  <p className="mt-1 text-sm text-steel">
                    Keep your schedule up to date so students can book the right
                    times.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TutorDashboard;
