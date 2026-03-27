import tutor1 from "@/assets/tutor1.jpg";
import tutor2 from "@/assets/tutor2.jpg";
import tutor3 from "@/assets/tutor3.jpg";
import tutor4 from "@/assets/tutor4.jpg";
import tutor5 from "@/assets/tutor5.jpg";
import tutor6 from "@/assets/tutor6.jpg";

export interface Tutor {
  id: string;
  name: string;
  photo: string;
  subjects: string[];
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  tagline: string;
  bio: string;
  location: string;
  verified: boolean;
  memberSince: string;
  responseTime: string;
  availability: Record<string, string[]>;
  education: string[];
  subjectLevels: { subject: string; level: string }[];
  reviews: { name: string; date: string; rating: number; comment: string }[];
}

export const tutors: Tutor[] = [
  {
    id: "1",
    name: "Anna Sigurdsdóttir",
    photo: tutor1,
    subjects: ["Mathematics", "Physics"],
    rating: 4.9,
    reviewCount: 42,
    pricePerHour: 6500,
    tagline: "Making math click, one step at a time",
    bio: "I'm a mathematics graduate from the University of Iceland with over 5 years of tutoring experience. I specialize in helping high school students build confidence in math and physics through structured, patient teaching. My students consistently improve their grades by at least one full mark within the first semester.",
    location: "Reykjavik",
    verified: true,
    memberSince: "Sep 2023",
    responseTime: "< 2 hours",
    availability: {
      Mon: ["16:00-20:00"],
      Tue: ["16:00-20:00"],
      Wed: ["14:00-20:00"],
      Thu: ["16:00-20:00"],
      Fri: ["14:00-18:00"],
      Sat: ["10:00-14:00"],
      Sun: [],
    },
    education: [
      "BSc Mathematics, University of Iceland",
      "Teaching Certificate, Kennaraháskóli Íslands",
    ],
    subjectLevels: [
      { subject: "Mathematics", level: "Middle School" },
      { subject: "Mathematics", level: "High School" },
      { subject: "Mathematics", level: "University" },
      { subject: "Physics", level: "High School" },
    ],
    reviews: [
      { name: "Guðrún H.", date: "Feb 2026", rating: 5, comment: "Anna is incredible! My son went from a 5 to an 8 in math. She's patient, encouraging, and really knows how to explain difficult concepts." },
      { name: "Ólafur K.", date: "Jan 2026", rating: 5, comment: "Best tutor I've ever had. She made calculus actually make sense." },
      { name: "Helga S.", date: "Dec 2025", rating: 4, comment: "Very professional and well-prepared. Would recommend for anyone struggling with math." },
    ],
  },
  {
    id: "2",
    name: "Bjarki Þórsson",
    photo: tutor2,
    subjects: ["English", "Danish"],
    rating: 4.7,
    reviewCount: 28,
    pricePerHour: 5500,
    tagline: "Languages are bridges — let's build yours",
    bio: "Originally from Akureyri, I studied English Literature and Scandinavian Studies at the University of Copenhagen. I've been teaching English and Danish for 3 years, focusing on conversational fluency and exam preparation. I use a communicative approach that gets you speaking from day one.",
    location: "Online",
    verified: true,
    memberSince: "Jan 2024",
    responseTime: "< 1 hour",
    availability: {
      Mon: ["09:00-12:00", "17:00-21:00"],
      Tue: ["09:00-12:00", "17:00-21:00"],
      Wed: ["09:00-12:00"],
      Thu: ["09:00-12:00", "17:00-21:00"],
      Fri: ["09:00-12:00"],
      Sat: [],
      Sun: ["10:00-14:00"],
    },
    education: [
      "BA English Literature, University of Copenhagen",
      "CELTA Certification",
    ],
    subjectLevels: [
      { subject: "English", level: "All Levels" },
      { subject: "Danish", level: "Beginner" },
      { subject: "Danish", level: "Intermediate" },
    ],
    reviews: [
      { name: "María J.", date: "Mar 2026", rating: 5, comment: "Bjarki is fun and engaging. My daughter actually looks forward to her English lessons now!" },
      { name: "Sigurður T.", date: "Feb 2026", rating: 4, comment: "Great at conversational Danish. Very patient with beginners." },
    ],
  },
  {
    id: "3",
    name: "Kristín Magnúsdóttir",
    photo: tutor3,
    subjects: ["Icelandic", "History"],
    rating: 4.8,
    reviewCount: 35,
    pricePerHour: 7000,
    tagline: "Understanding the past to shape the future",
    bio: "With 15 years of experience as a secondary school teacher, I bring deep expertise in Icelandic language arts and Nordic history. I work with students preparing for national exams and help international residents learn Icelandic. My teaching style combines traditional methods with modern, engaging activities.",
    location: "Kopavogur",
    verified: true,
    memberSince: "Mar 2023",
    responseTime: "< 4 hours",
    availability: {
      Mon: ["15:00-19:00"],
      Tue: [],
      Wed: ["15:00-19:00"],
      Thu: ["15:00-19:00"],
      Fri: [],
      Sat: ["09:00-13:00"],
      Sun: [],
    },
    education: [
      "MA Icelandic Studies, University of Iceland",
      "BA History, University of Iceland",
      "Certified Secondary School Teacher",
    ],
    subjectLevels: [
      { subject: "Icelandic", level: "All Levels" },
      { subject: "History", level: "High School" },
      { subject: "History", level: "University" },
    ],
    reviews: [
      { name: "Eiríkur M.", date: "Mar 2026", rating: 5, comment: "Kristín helped me pass my Icelandic proficiency exam. She's incredibly knowledgeable and encouraging." },
      { name: "Sarah L.", date: "Jan 2026", rating: 5, comment: "As an expat, learning Icelandic felt impossible until I found Kristín. She makes it approachable and fun." },
      { name: "Jón B.", date: "Dec 2025", rating: 4, comment: "Excellent history tutor. My son's grades have improved significantly." },
    ],
  },
  {
    id: "4",
    name: "David Chen",
    photo: tutor4,
    subjects: ["Computer Science", "Mathematics"],
    rating: 4.6,
    reviewCount: 19,
    pricePerHour: 8000,
    tagline: "Code your way to understanding",
    bio: "Software engineer by day, tutor by evening. I graduated from Reykjavik University with a degree in Computer Science and now work at a leading tech company. I love helping students discover the beauty of programming and computational thinking. I teach Python, Java, web development, and competitive math.",
    location: "Reykjavik",
    verified: true,
    memberSince: "Jun 2024",
    responseTime: "< 3 hours",
    availability: {
      Mon: ["18:00-21:00"],
      Tue: ["18:00-21:00"],
      Wed: [],
      Thu: ["18:00-21:00"],
      Fri: [],
      Sat: ["10:00-16:00"],
      Sun: ["10:00-16:00"],
    },
    education: [
      "BSc Computer Science, Reykjavik University",
      "AWS Certified Developer",
    ],
    subjectLevels: [
      { subject: "Computer Science", level: "High School" },
      { subject: "Computer Science", level: "University" },
      { subject: "Mathematics", level: "High School" },
    ],
    reviews: [
      { name: "Ásgeir R.", date: "Feb 2026", rating: 5, comment: "David made programming accessible and exciting. My son is now building his own apps!" },
      { name: "Katrín V.", date: "Jan 2026", rating: 4, comment: "Very knowledgeable, sometimes goes a bit fast but always willing to re-explain." },
    ],
  },
  {
    id: "5",
    name: "Sofia Hernandez",
    photo: tutor5,
    subjects: ["Chemistry", "Physics"],
    rating: 4.8,
    reviewCount: 31,
    pricePerHour: 6000,
    tagline: "Science isn't scary — let me show you",
    bio: "I'm a PhD student in Chemistry at the University of Iceland. I've been tutoring science subjects for 4 years and love breaking down complex concepts into digestible pieces. I use lots of real-world examples and demonstrations to make chemistry and physics come alive.",
    location: "Hafnarfjordur",
    verified: true,
    memberSince: "Aug 2023",
    responseTime: "< 2 hours",
    availability: {
      Mon: ["14:00-18:00"],
      Tue: ["14:00-18:00"],
      Wed: ["14:00-18:00"],
      Thu: [],
      Fri: ["14:00-18:00"],
      Sat: ["10:00-14:00"],
      Sun: [],
    },
    education: [
      "PhD Chemistry (in progress), University of Iceland",
      "MSc Chemistry, University of Barcelona",
    ],
    subjectLevels: [
      { subject: "Chemistry", level: "High School" },
      { subject: "Chemistry", level: "University" },
      { subject: "Physics", level: "High School" },
    ],
    reviews: [
      { name: "Bergþóra Á.", date: "Mar 2026", rating: 5, comment: "Sofia is fantastic! She explains everything so clearly and always comes prepared with great examples." },
      { name: "Finnur G.", date: "Feb 2026", rating: 5, comment: "I was failing chemistry before Sofia. Now it's my best subject!" },
    ],
  },
  {
    id: "6",
    name: "Gunnar Jónsson",
    photo: tutor6,
    subjects: ["Mathematics", "Physics", "Chemistry"],
    rating: 4.9,
    reviewCount: 67,
    pricePerHour: 9500,
    tagline: "30 years of teaching, still passionate",
    bio: "Retired high school science teacher with 30 years of experience. I specialize in exam preparation for stúdentspróf and university entrance. My approach is structured and methodical — I identify gaps in understanding and fill them systematically. Many of my former students are now doctors, engineers, and scientists.",
    location: "Akureyri",
    verified: true,
    memberSince: "Feb 2023",
    responseTime: "< 6 hours",
    availability: {
      Mon: ["09:00-16:00"],
      Tue: ["09:00-16:00"],
      Wed: ["09:00-16:00"],
      Thu: ["09:00-16:00"],
      Fri: ["09:00-12:00"],
      Sat: [],
      Sun: [],
    },
    education: [
      "MSc Physics, University of Iceland",
      "BSc Chemistry, University of Iceland",
      "35 years teaching experience",
    ],
    subjectLevels: [
      { subject: "Mathematics", level: "High School" },
      { subject: "Mathematics", level: "University" },
      { subject: "Physics", level: "All Levels" },
      { subject: "Chemistry", level: "High School" },
    ],
    reviews: [
      { name: "Hanna Þ.", date: "Mar 2026", rating: 5, comment: "Gunnar is the reason I got into medical school. His structured approach to physics is unmatched." },
      { name: "Björn S.", date: "Feb 2026", rating: 5, comment: "A true master teacher. Worth every króna." },
      { name: "Sigrún L.", date: "Jan 2026", rating: 5, comment: "My daughter improved from a 6 to a 9 in math with Gunnar. Incredible results." },
    ],
  },
];
