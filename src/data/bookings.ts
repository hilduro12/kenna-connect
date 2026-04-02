export type BookingStatus = "inquiry" | "pending" | "confirmed" | "completed" | "cancelled";
export type LocationType = "online" | "in_person";

export interface Booking {
  id: string;
  personName: string;
  personRole: "tutor" | "parent" | "student";
  personAvatar: string;
  subject: string;
  date: string;
  time: string;
  location: LocationType;
  status: BookingStatus;
  note: string;
  duration: string;
}

export const bookingStatusLabels: Record<BookingStatus, string> = {
  inquiry: "Inquiry sent",
  pending: "Booking pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const bookingStatusColors: Record<BookingStatus, string> = {
  inquiry: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-emerald-100 text-emerald-700",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-600",
};

export const locationLabels: Record<LocationType, string> = {
  online: "Online",
  in_person: "In person",
};

export const bookings: Booking[] = [
  {
    id: "b1",
    personName: "Anna Sigurðsdóttir",
    personRole: "tutor",
    personAvatar: "AS",
    subject: "Mathematics",
    date: "Tue, 15 Apr",
    time: "15:00",
    location: "in_person",
    status: "inquiry",
    note: "Requested help for 9th-grade algebra — preparing for an exam in two weeks.",
    duration: "60 min",
  },
  {
    id: "b2",
    personName: "Bjarki Þórsson",
    personRole: "tutor",
    personAvatar: "BÞ",
    subject: "English",
    date: "Wed, 16 Apr",
    time: "17:00",
    location: "online",
    status: "confirmed",
    note: "Essay writing preparation — argumentative and descriptive formats. Bring textbook.",
    duration: "60 min",
  },
  {
    id: "b3",
    personName: "Helga Jónsdóttir",
    personRole: "tutor",
    personAvatar: "HJ",
    subject: "Chemistry",
    date: "Thu, 10 Apr",
    time: "14:00",
    location: "online",
    status: "completed",
    note: "Covered organic chemistry basics and reaction mechanisms. Went well.",
    duration: "90 min",
  },
  {
    id: "b4",
    personName: "Bergþóra Ásgeirsdóttir",
    personRole: "student",
    personAvatar: "BÁ",
    subject: "Driving",
    date: "Sat, 19 Apr",
    time: "10:00",
    location: "in_person",
    status: "pending",
    note: "First assessment drive — student has learner's permit with ~10 hours of practice.",
    duration: "60 min",
  },
  {
    id: "b5",
    personName: "Guðrún Helgadóttir",
    personRole: "parent",
    personAvatar: "GH",
    subject: "Physics",
    date: "Mon, 21 Apr",
    time: "16:00",
    location: "online",
    status: "inquiry",
    note: "Looking for weekly physics tutoring for son in 10th grade. Wants consistent support.",
    duration: "60 min",
  },
  {
    id: "b6",
    personName: "Ólafur Magnússon",
    personRole: "tutor",
    personAvatar: "ÓM",
    subject: "Piano",
    date: "Fri, 4 Apr",
    time: "15:30",
    location: "in_person",
    status: "completed",
    note: "First lesson — learned basic scales and a simple melody. Practice exercises sent.",
    duration: "45 min",
  },
  {
    id: "b7",
    personName: "Katrín Sveinsdóttir",
    personRole: "student",
    personAvatar: "KS",
    subject: "Mathematics",
    date: "Wed, 9 Apr",
    time: "11:00",
    location: "online",
    status: "cancelled",
    note: "Student cancelled due to schedule conflict.",
    duration: "60 min",
  },
  {
    id: "b8",
    personName: "Bjarki Þórsson",
    personRole: "tutor",
    personAvatar: "BÞ",
    subject: "English",
    date: "Sat, 19 Apr",
    time: "14:00",
    location: "online",
    status: "confirmed",
    note: "Follow-up session — review essay drafts and grammar corrections.",
    duration: "60 min",
  },
];
