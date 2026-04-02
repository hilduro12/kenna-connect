/**
 * Centralized UI strings for Kenna.
 *
 * Purpose:
 *  - Single source of truth for shared / repeated text
 *  - Makes future Icelandic translation easier (swap this file or add is.ts)
 *  - Page-specific copy stays inline in each page — only shared strings live here
 *
 * Terminology rules:
 *  - "teacher"   in all student/parent-facing copy
 *  - "tutor"     only in internal code (role names, component/file names, data types)
 *  - "lesson"    everywhere (never "session")
 *  - "booking"   for a confirmed lesson
 *  - "request"   for a pending lesson request (never "contact" or "inquiry")
 *  - "Start Teaching" as the CTA for the application (never "sign up as tutor")
 *  - The application flow is always framed as "apply" (never "sign up")
 */

/* ── Brand ── */
export const BRAND = {
  name: "Kenna",
  tagline: "Iceland's marketplace for private lessons.",
  copyright: "Kenna ehf. All rights reserved.",
} as const;

/* ── Navigation ── */
export const NAV = {
  browse: "Browse",
  pricing: "Pricing",
  startTeaching: "Start Teaching",
  dashboard: "Dashboard",
  schedule: "Schedule",
  bookings: "Bookings",
  messages: "Messages",
  account: "Account",
  logIn: "Log In",
  signUp: "Sign Up",
  logOut: "Log Out",
} as const;

/* ── Auth ── */
export const AUTH = {
  logIn: "Log in",
  logInWithEmail: "Log in with email",
  logInWithGoogle: "Log in with Google",
  logInWithApple: "Log in with Apple",
  signUp: "Create an account",
  signUpSubtext: "Find the right teacher for you or your child",
  signUpWithEmail: "Create account",
  signUpWithGoogle: "Sign up with Google",
  signUpWithApple: "Sign up with Apple",
  noAccount: "Don't have an account?",
  hasAccount: "Already have an account?",
  wantToTeach: "Want to teach on Kenna?",
  applyHere: "Apply here",
  legalNotice: "By signing up, you agree to our",
  legalLink: "legal notices",
} as const;

/* ── Common actions ── */
export const ACTIONS = {
  next: "Next",
  back: "Back",
  save: "Save changes",
  cancel: "Cancel",
  submit: "Submit",
  search: "Search",
  viewAll: "View all",
  viewProfile: "View profile",
  sendMessage: "Send message",
  requestLesson: "Request a lesson",
  leaveReview: "Leave a review",
  editProfile: "Edit profile",
  backToHome: "Back to home",
  browseTeachers: "Browse teachers",
} as const;

/* ── Subscription ── */
export const SUBSCRIPTION = {
  choosePlan: "Choose a plan to continue",
  choosePlanSubtext: "Get full access to messaging, booking, and trusted teacher connections on Kenna.",
  cancelAnytime: "Cancel anytime. No lock-in contracts.",
  moneyBackGuarantee: "14-day money-back guarantee",
  moneyBackDetail: "Not satisfied? Contact us within 14 days for a full refund — no questions asked.",
  subscribeNow: "Subscribe Now",
  subscribeCta: "Subscribe to discover all teachers",
} as const;

/* ── Footer ── */
export const FOOTER = {
  platform: "Platform",
  company: "Company",
  legal: "Legal",
  browseTeachers: "Browse Teachers",
  pricing: "Pricing",
  startTeaching: "Start Teaching",
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
} as const;

/* ── Teacher application ── */
export const TEACHER_APPLICATION = {
  title: "Apply to teach on Kenna",
  subtitle: "This is an application, not a sign-up. Once approved, you'll receive login credentials by email.",
  submitApplication: "Submit application",
  applicationReceived: "Application received!",
  freeToApply: "It's free to apply. Kenna does not charge teachers any fees. You set your own rates and keep your earnings.",
} as const;

/* ── Availability options (shared between application, profile edit, and display) ── */
export const AVAILABILITY_OPTIONS = [
  "Weekday mornings",
  "Weekday afternoons",
  "Weekday evenings",
  "Weekends",
  "Flexible",
] as const;

/* ── Terminology reference (for developers) ──
 *
 * Student-facing copy:
 *   teacher    (not "tutor")
 *   lesson     (not "session")
 *   booking    (confirmed lesson)
 *   request    (pending lesson request)
 *
 * CTAs:
 *   "Start Teaching"       (the apply CTA)
 *   "Request a lesson"     (student → teacher)
 *   "Browse teachers"      (discovery)
 *
 * Internal / code:
 *   tutor      (role name, component names, data types)
 *   user       (generic logged-in person)
 *
 * Application flow:
 *   "apply" / "application"   (never "sign up" for teachers)
 *   Status: pending_review → approved | rejected
 */
