import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventsPage from "./pages/EventsPage";
import TeamPage from "./pages/TeamPage";
import BlogPage from "./pages/BlogPage";
import VotingPage from "./pages/VotingPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import VotingDashboard from "./pages/admin/VotingDashboard";
import AdManager from "./pages/admin/AdManager";
import EventForm from "./pages/admin/EventForm";
import ProtectedRoute from "@/components/ProtectedRoute";
import "@/lib/debug";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/voting" element={<VotingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/voting" 
            element={
              <ProtectedRoute>
                <VotingDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/ads" 
            element={
              <ProtectedRoute>
                <AdManager />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/events/new" 
            element={
              <ProtectedRoute>
                <EventForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/events/edit/:id" 
            element={
              <ProtectedRoute>
                <EventForm />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
