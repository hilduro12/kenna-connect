/**
 * Centralized UI strings for Kenna.
 *
 * Purpose:
 *  - Single source of truth for shared / repeated text
 *  - Makes future Icelandic translation easier (swap this file or add is.ts)
 *  - Page-specific copy stays inline in each page — only shared strings live here
 *
 * Convention:
 *  - "teacher" in student-facing copy (not "tutor")
 *  - "tutor" only for internal code / role names
 *  - "lesson" everywhere (not "session")
 *  - "booking" for confirmed lessons, "request" for pending
 */

/* ── Brand ── */
export const BRAND = {
  name: "Kenna",
  tagline: "Iceland's marketplace for private tutoring.",
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
  bookLesson: "Book lesson",
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
  subtitle: "This is an application — not a sign-up. Once approved, you'll receive login credentials by email.",
  submitApplication: "Submit Application",
  applicationReceived: "Application received!",
  freeToApply: "It's free to apply. Kenna does not charge teachers a signup fee. You set your own rates and keep your earnings.",
} as const;

/* ── Terminology reference (for developers) ──
 *
 * Student-facing copy:
 *   teacher  (not "tutor")
 *   lesson   (not "session")
 *   booking  (confirmed lesson)
 *   request  (pending lesson request)
 *
 * Internal / code:
 *   tutor    (role name, component names, data types)
 *   user     (generic logged-in person)
 */
