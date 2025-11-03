import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "@/components/LoginPage";
import PendingApprovalPage from "@/components/PendingApprovalPage";
import AdminDashboard from "@/components/AdminDashboard";
import MessengerApp from "@/components/MessengerApp";
import NotFound from "@/pages/not-found";

type AuthState = "logged-out" | "pending-approval" | "approved";
type ViewMode = "messenger" | "admin";

function Router() {
  const [, setLocation] = useLocation();
  
  //TODO: remove mock functionality - replace with real auth state
  const [authState, setAuthState] = useState<AuthState>("logged-out");
  const [viewMode, setViewMode] = useState<ViewMode>("messenger");
  
  const currentUser = {
    name: "Dr. Emily Chen",
    initials: "EC",
    isAdmin: true,
  };

  // Handle login (mock - will be replaced with Replit Auth)
  const handleLogin = () => {
    setAuthState("approved"); // Change to "pending-approval" to see that screen
    setViewMode("messenger");
  };

  // Handle logout
  const handleLogout = () => {
    setAuthState("logged-out");
    setViewMode("messenger");
  };

  // Switch between messenger and admin views
  const handleAdminToggle = () => {
    setViewMode(prev => prev === "messenger" ? "admin" : "messenger");
  };

  // Render based on auth state
  if (authState === "logged-out") {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (authState === "pending-approval") {
    return <PendingApprovalPage onLogout={handleLogout} />;
  }

  // User is approved - show messenger or admin based on viewMode
  return (
    <Switch>
      <Route path="/">
        {viewMode === "admin" ? (
          <div className="h-screen flex flex-col">
            <div className="border-b bg-background p-4">
              <button
                onClick={handleAdminToggle}
                className="text-sm text-primary hover:underline"
                data-testid="link-back-to-messenger"
              >
                ← Back to Messenger
              </button>
            </div>
            <div className="flex-1 overflow-auto">
              <AdminDashboard />
            </div>
          </div>
        ) : (
          <MessengerApp
            currentUser={currentUser}
            onLogout={handleLogout}
            onAdminClick={currentUser.isAdmin ? handleAdminToggle : undefined}
          />
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
