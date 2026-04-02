import { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  MessageCircle,
  User,
  RotateCcw,
  Star,
  Check,
  X,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  bookings,
  bookingStatusLabels,
  bookingStatusColors,
  locationLabels,
  type Booking,
  type BookingStatus,
} from "@/data/bookings";
import { useAuth } from "@/contexts/AuthContext";

const roleLabels: Record<string, string> = {
  tutor: "Tutor",
  parent: "Parent",
  student: "Student",
};

type TabKey = "pending" | "upcoming" | "past" | "cancelled";

const tabFilters: Record<TabKey, BookingStatus[]> = {
  pending: ["inquiry", "pending"],
  upcoming: ["confirmed"],
  past: ["completed"],
  cancelled: ["cancelled"],
};

const Bookings = () => {
  const { user } = useAuth();
  const isTutor = user?.role === "tutor";
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");

  const filteredBookings = useMemo(() => {
    const statuses = tabFilters[activeTab];
    return bookings.filter((b) => statuses.includes(b.status));
  }, [activeTab]);

  const tabCounts = useMemo(() => {
    const counts: Record<TabKey, number> = { pending: 0, upcoming: 0, past: 0, cancelled: 0 };
    bookings.forEach((b) => {
      for (const [key, statuses] of Object.entries(tabFilters) as [TabKey, BookingStatus[]][]) {
        if (statuses.includes(b.status)) counts[key]++;
      }
    });
    return counts;
  }, []);

  /* ─── Actions by status ─── */
  const BookingActions = ({ booking }: { booking: Booking }) => {
    if (booking.status === "inquiry") {
      return isTutor ? (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="gap-1.5 text-xs">
            <Check className="h-3.5 w-3.5" /> Accept
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <X className="h-3.5 w-3.5" /> Decline
          </Button>
          <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5" /> Message
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5" /> Message teacher
          </Button>
          <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5" /> View teacher
          </Button>
        </div>
      );
    }

    if (booking.status === "pending") {
      return isTutor ? (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="gap-1.5 text-xs">
            <Check className="h-3.5 w-3.5" /> Confirm
          </Button>
          <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5" /> Message
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="gap-1.5 text-xs">
            <MessageCircle className="h-3.5 w-3.5" /> Confirm details
          </Button>
          <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5" /> View teacher
          </Button>
        </div>
      );
    }

    if (booking.status === "confirmed") {
      return (
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5" /> Message
          </Button>
          {isTutor && (
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Check className="h-3.5 w-3.5" /> Mark complete
            </Button>
          )}
          <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5" /> View {isTutor ? "student" : "teacher"}
          </Button>
        </div>
      );
    }

    if (booking.status === "completed") {
      return (
        <div className="flex flex-wrap gap-2">
          {!isTutor && (
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Star className="h-3.5 w-3.5" /> Leave review
            </Button>
          )}
          <Button size="sm" className="gap-1.5 text-xs">
            <RotateCcw className="h-3.5 w-3.5" /> Book again
          </Button>
          <Button size="sm" variant="ghost" className="gap-1.5 text-xs text-muted-foreground">
            <MessageCircle className="h-3.5 w-3.5" /> Message
          </Button>
        </div>
      );
    }

    return null;
  };

  /* ─── Booking card ─── */
  const BookingCard = ({ booking }: { booking: Booking }) => (
    <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left: avatar + info */}
        <div className="flex items-start gap-3.5">
          <Avatar className="h-11 w-11 shrink-0">
            <AvatarFallback className="bg-primary/10 text-sm font-medium text-primary">
              {booking.personAvatar}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-foreground">{booking.personName}</span>
              <span className="text-[11px] text-muted-foreground">{roleLabels[booking.personRole]}</span>
              <span className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${bookingStatusColors[booking.status]}`}>
                {bookingStatusLabels[booking.status]}
              </span>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                {booking.subject}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {booking.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {booking.time} · {booking.duration}
              </span>
              <span className="flex items-center gap-1">
                {booking.location === "online" ? (
                  <Video className="h-3.5 w-3.5" />
                ) : (
                  <MapPin className="h-3.5 w-3.5" />
                )}
                {locationLabels[booking.location]}
              </span>
            </div>

            <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
              {booking.note}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3.5 border-t border-border pt-3">
        <BookingActions booking={booking} />
      </div>
    </div>
  );

  /* ─── Empty state ─── */
  const EmptyState = ({ tab }: { tab: TabKey }) => {
    const messages: Record<TabKey, { title: string; desc: string }> = {
      pending: {
        title: "No pending requests",
        desc: "When you send an inquiry or receive a booking request, it will appear here.",
      },
      upcoming: {
        title: "No upcoming lessons",
        desc: "Your confirmed lessons will show up here. Browse teachers to get started.",
      },
      past: {
        title: "No past lessons yet",
        desc: "After you complete a lesson, it will appear here with options to rebook or review.",
      },
      cancelled: {
        title: "No cancelled bookings",
        desc: "Cancelled or declined bookings will be listed here for your records.",
      },
    };
    const { title, desc } = messages[tab];
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/10 px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted/40">
          <Calendar className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{desc}</p>
        {tab === "upcoming" && !isTutor && (
          <Link to="/browse">
            <Button className="mt-5 gap-1.5" size="sm">
              Browse teachers <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              {isTutor ? "Schedule" : "Bookings"}
            </h1>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as TabKey)}
            className="w-full"
          >
            <TabsList className="mb-6 w-full justify-start bg-muted/30 p-1 h-auto flex-wrap">
              {(["pending", "upcoming", "past", "cancelled"] as TabKey[]).map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="gap-1.5 text-xs capitalize data-[state=active]:bg-card data-[state=active]:shadow-sm px-4 py-2"
                >
                  {tab}
                  {tabCounts[tab] > 0 && (
                    <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary/10 px-1.5 text-[11px] font-semibold text-primary">
                      {tabCounts[tab]}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {(["pending", "upcoming", "past", "cancelled"] as TabKey[]).map((tab) => (
              <TabsContent key={tab} value={tab}>
                {filteredBookings.length === 0 ? (
                  <EmptyState tab={tab} />
                ) : (
                  <div className="space-y-3">
                    {filteredBookings.map((b) => (
                      <BookingCard key={b.id} booking={b} />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Bookings;
