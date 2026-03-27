import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import BrowseTutors from "./pages/BrowseTutors";
import TutorProfile from "./pages/TutorProfile";
import TutorSignUp from "./pages/TutorSignUp";
import StudentSignUp from "./pages/StudentSignUp";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<BrowseTutors />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/tutor-signup" element={<TutorSignUp />} />
          <Route path="/student-signup" element={<StudentSignUp />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
