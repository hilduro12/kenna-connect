import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import RequireSubscription from "./components/RequireSubscription";
import RequireApprovedTutor from "./components/RequireApprovedTutor";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import PreviewToggle from "./components/PreviewToggle";
import BrowseTutors from "./pages/BrowseTutors";
import TutorProfile from "./pages/TutorProfile";
import TutorSignUp from "./pages/TutorSignUp";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import ChoosePlan from "./pages/ChoosePlan";
import Dashboard from "./pages/Dashboard";
import TutorDashboard from "./pages/TutorDashboard";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import TutorProfileEdit from "./pages/TutorProfileEdit";
import ApplicationPending from "./pages/ApplicationPending";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <PreviewToggle />
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<BrowseTutors />} />
            <Route path="/tutor/:id" element={<TutorProfile />} />
            <Route path="/tutor-signup" element={<TutorSignUp />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/choose-plan" element={<ChoosePlan />} />
            <Route path="/application-pending" element={<ApplicationPending />} />

            {/* Tutor pages (approved tutors only) */}
            <Route path="/tutor-dashboard" element={<RequireApprovedTutor><TutorDashboard /></RequireApprovedTutor>} />
            <Route path="/tutor-profile-edit" element={<RequireApprovedTutor><TutorProfileEdit /></RequireApprovedTutor>} />

            {/* Student pages (subscription required) */}
            <Route path="/dashboard" element={<RequireSubscription><Dashboard /></RequireSubscription>} />

            {/* Shared pages (both roles use these — guarded by both walls) */}
            <Route path="/messages" element={<RequireApprovedTutor><RequireSubscription><Messages /></RequireSubscription></RequireApprovedTutor>} />
            <Route path="/bookings" element={<RequireApprovedTutor><RequireSubscription><Bookings /></RequireSubscription></RequireApprovedTutor>} />
            <Route path="/account" element={<RequireApprovedTutor><RequireSubscription><Account /></RequireSubscription></RequireApprovedTutor>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
