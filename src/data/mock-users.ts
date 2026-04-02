/**
 * Mock users for local development.
 * Replace with real Supabase auth when backend is ready.
 *
 * Usage: login with any of these email/password combos on the login page.
 */

import type { User } from "@/contexts/AuthContext";

/* ── Tutor application status ── */
export type TutorStatus = "pending_review" | "approved" | "rejected";

/**
 * Shape of a tutor application record.
 * In production this would be a Supabase table row.
 * Kept here as a reference for the data model.
 */
export interface TutorApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  subjects: string[];
  rate: number;
  bio: string;
  experience?: string;
  education?: string;
  availability: string[];       // e.g. ["Weekday evenings", "Weekends"]
  teachingFormat: string;       // "Online" | "In person" | "Both"
  status: TutorStatus;
  submittedAt: string;          // ISO date
  reviewedAt?: string;          // ISO date, set when admin acts
  reviewedBy?: string;          // admin user id
  rejectionReason?: string;     // only when status === "rejected"
}

/* ── Mock user accounts ── */
export interface MockUser extends User {
  password: string;
  tutorStatus?: TutorStatus;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "demo-student-1",
    name: "Anna Sigurðardóttir",
    email: "student@kenna.test",
    password: "demo123",
    role: "student",
    roles: ["student"],
    subscribed: false, // Unsubscribed — will hit subscription wall
  },
  {
    id: "demo-student-2",
    name: "Björk Helgadóttir",
    email: "subscribed@kenna.test",
    password: "demo123",
    role: "student",
    roles: ["student"],
    subscribed: true, // Active subscription — full access
  },
  {
    id: "demo-tutor-1",
    name: "Eiríkur Jónsson",
    email: "tutor@kenna.test",
    password: "demo123",
    role: "tutor",
    roles: ["tutor"],
    subscribed: false,
    tutorStatus: "approved",
  },
  {
    id: "demo-pending-1",
    name: "Katrín Björnsdóttir",
    email: "pendingtutor@kenna.test",
    password: "demo123",
    role: "tutor",
    roles: ["tutor"],
    subscribed: false,
    tutorStatus: "pending_review",
  },
];

/**
 * Look up a mock user by email + password.
 * Returns the user (without password) or null if no match.
 */
export function authenticateMockUser(
  email: string,
  password: string
): { user: User; tutorStatus?: TutorStatus } | null {
  const match = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!match) return null;

  // Strip password before returning
  const { password: _, ...user } = match;
  return { user, tutorStatus: match.tutorStatus };
}
