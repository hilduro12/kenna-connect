export type ConversationStatus = "inquiry" | "booking_pending" | "lesson_booked" | "completed";
export type UserRole = "tutor" | "parent" | "student";

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  subject: string;
  status: ConversationStatus;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  messages: Message[];
}

export const statusLabels: Record<ConversationStatus, string> = {
  inquiry: "Inquiry",
  booking_pending: "Booking pending",
  lesson_booked: "Lesson booked",
  completed: "Completed lesson",
};

export const statusColors: Record<ConversationStatus, string> = {
  inquiry: "bg-blue-100 text-blue-700",
  booking_pending: "bg-amber-100 text-amber-700",
  lesson_booked: "bg-emerald-100 text-emerald-700",
  completed: "bg-gray-100 text-gray-600",
};

export const roleLabels: Record<UserRole, string> = {
  tutor: "Tutor",
  parent: "Parent",
  student: "Student",
};

export const conversations: Conversation[] = [
  {
    id: "1",
    name: "Anna Sigurðsdóttir",
    role: "tutor",
    avatar: "AS",
    subject: "Mathematics",
    status: "inquiry",
    lastMessage: "I'd be happy to help your daughter with algebra. Would Tuesday work?",
    lastMessageTime: "10:32",
    unread: 2,
    messages: [
      {
        id: "m1",
        senderId: "me",
        text: "Hi Anna! My daughter is in 9th grade and struggling with algebra. She has a test coming up in two weeks. Could you help?",
        timestamp: "Yesterday, 14:20",
        isOwn: true,
      },
      {
        id: "m2",
        senderId: "anna",
        text: "Hello! Yes, I specialise in secondary school mathematics and have worked with many students preparing for exams. What topics is she finding most difficult?",
        timestamp: "Yesterday, 15:05",
        isOwn: false,
      },
      {
        id: "m3",
        senderId: "me",
        text: "Mostly equations and inequalities. She also needs to review fractions and percentages.",
        timestamp: "Yesterday, 15:12",
        isOwn: true,
      },
      {
        id: "m4",
        senderId: "anna",
        text: "That's a very common combination. I usually start with a short assessment to understand exactly where the gaps are, and then we create a focused study plan.",
        timestamp: "Yesterday, 15:30",
        isOwn: false,
      },
      {
        id: "m5",
        senderId: "anna",
        text: "I'd be happy to help your daughter with algebra. Would Tuesday work for a first session? I have slots at 15:00 and 16:30.",
        timestamp: "Today, 10:32",
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    name: "Bjarki Þórsson",
    role: "tutor",
    avatar: "BÞ",
    subject: "English",
    status: "lesson_booked",
    lastMessage: "See you Thursday at 4! Bring your textbook and any recent essays.",
    lastMessageTime: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "m1",
        senderId: "me",
        text: "Hi Bjarki, I'd like to book a session to prepare for my English writing exam.",
        timestamp: "Mon, 09:15",
        isOwn: true,
      },
      {
        id: "m2",
        senderId: "bjarki",
        text: "Hi! I'd love to help. When is your exam and what format is it — essay, short answers, or both?",
        timestamp: "Mon, 10:00",
        isOwn: false,
      },
      {
        id: "m3",
        senderId: "me",
        text: "It's in three weeks. Mostly essay writing — argumentative and descriptive.",
        timestamp: "Mon, 10:08",
        isOwn: true,
      },
      {
        id: "m4",
        senderId: "bjarki",
        text: "Great. I've booked you in for Thursday at 16:00. We'll start with essay structure and work through a practice prompt together.",
        timestamp: "Mon, 11:30",
        isOwn: false,
      },
      {
        id: "m5",
        senderId: "bjarki",
        text: "See you Thursday at 4! Bring your textbook and any recent essays you've written so I can see your current level.",
        timestamp: "Tue, 09:15",
        isOwn: false,
      },
    ],
  },
  {
    id: "3",
    name: "Guðrún Helgadóttir",
    role: "parent",
    avatar: "GH",
    subject: "Piano",
    status: "completed",
    lastMessage: "Thank you so much! Katrín really enjoyed the lesson.",
    lastMessageTime: "2 days ago",
    unread: 0,
    messages: [
      {
        id: "m1",
        senderId: "gudrun",
        text: "Hi! I saw your profile — my daughter Katrín (age 10) would love to start piano lessons. She's a complete beginner.",
        timestamp: "Last week, Mon 11:00",
        isOwn: false,
      },
      {
        id: "m2",
        senderId: "me",
        text: "Hello Guðrún! I'd be delighted to teach Katrín. I have a lot of experience with young beginners. Does she have access to a piano or keyboard at home?",
        timestamp: "Last week, Mon 12:30",
        isOwn: true,
      },
      {
        id: "m3",
        senderId: "gudrun",
        text: "Yes, we have an upright piano. She's very enthusiastic!",
        timestamp: "Last week, Mon 13:00",
        isOwn: false,
      },
      {
        id: "m4",
        senderId: "me",
        text: "Wonderful! We had a great first session. Katrín learned her first scale and a simple melody. I've sent some practice exercises she can work on this week.",
        timestamp: "Last week, Thu 17:30",
        isOwn: true,
      },
      {
        id: "m5",
        senderId: "gudrun",
        text: "Thank you so much! Katrín really enjoyed the lesson. She's already been practising. Same time next week?",
        timestamp: "Last week, Fri 10:00",
        isOwn: false,
      },
    ],
  },
  {
    id: "4",
    name: "Bergþóra Ásgeirsdóttir",
    role: "student",
    avatar: "BÁ",
    subject: "Driving",
    status: "booking_pending",
    lastMessage: "Could we do Saturday morning instead?",
    lastMessageTime: "3h ago",
    unread: 1,
    messages: [
      {
        id: "m1",
        senderId: "bergthora",
        text: "Hi! I'm looking for driving lessons. I have my learner's permit and I've done about 10 hours of practice with my parents.",
        timestamp: "Today, 08:00",
        isOwn: false,
      },
      {
        id: "m2",
        senderId: "me",
        text: "Welcome Bergþóra! That's a great start. I usually begin with an assessment drive to see where you're at, and then we'll build a lesson plan from there.",
        timestamp: "Today, 08:45",
        isOwn: true,
      },
      {
        id: "m3",
        senderId: "me",
        text: "I have availability on Friday afternoon or Saturday morning this week. Which works better for you?",
        timestamp: "Today, 08:46",
        isOwn: true,
      },
      {
        id: "m4",
        senderId: "bergthora",
        text: "Could we do Saturday morning instead? Friday is a bit tight for me.",
        timestamp: "Today, 09:30",
        isOwn: false,
      },
    ],
  },
];
