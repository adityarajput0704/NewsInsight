import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { NewsTicker } from "./components/NewsTicker";
import { LeftSidebar } from "./components/LeftSidebar";
import { RightSidebar } from "./components/RightSidebar";
import { CentralPanel } from "./components/CentralPanel";
import { FloatingChatbot } from "./components/FloatingChatbot";
import { VerifyContent } from "./components/menus/VerifyContent";
import { RumorTrends } from "./components/menus/RumorTrends";
import { Leaderboard } from "./components/menus/Leaderboard";
import { UserProfile } from "./components/menus/UserProfile";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    // Check if user has a saved preference, otherwise default to true
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(false);

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const renderMainContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <CentralPanel isDark={isDark} />;
      case "live-news":
        return (
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-8 w-8 bg-red-500 rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-white rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900 dark:text-white">
                  Live News Feed
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time monitoring of news and rumors
                </p>
              </div>
            </div>
            <div className="text-center mt-20 text-gray-600 dark:text-gray-400">
              <p>Live news feed will be displayed here</p>
              <p className="text-sm mt-2">
                Connect to news APIs for real-time data
              </p>
            </div>
          </div>
        );
      case "rumor-trends":
        return <RumorTrends isDark={isDark} />;
      case "verify-content":
        return <VerifyContent isDark={isDark} />;
      case "leaderboard":
        return <Leaderboard isDark={isDark} />;
      case "chatbot":
        return (
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-500 dark:bg-cyan-500">
                  <div className="h-4 w-4 bg-white rounded-full" />
                </div>
                <div className="absolute inset-0 rounded-full blur-sm animate-pulse bg-blue-400/30 dark:bg-cyan-400/30" />
              </div>
              <div>
                <h1 className="text-2xl text-gray-900 dark:text-white">
                  AI Chatbot
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Intelligent fact-checking assistant
                </p>
              </div>
            </div>
            <div className="text-center mt-20 text-gray-600 dark:text-gray-400">
              <p>
                Enhanced chatbot interface will be displayed
                here
              </p>
              <p className="text-sm mt-2">
                Use the floating chatbot for quick interactions
              </p>
            </div>
          </div>
        );
      case "profile":
        return <UserProfile isDark={isDark} />;
      default:
        return <CentralPanel isDark={isDark} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation Bar */}
      <Navbar
        isDark={isDark}
        onThemeToggle={toggleTheme}
        onToggleSidebar={toggleSidebar}
        isSidebarCollapsed={isSidebarCollapsed}
      />

      {/* Live News Ticker */}
      <NewsTicker isDark={isDark} />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Overlay */}
        {!isSidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Left Sidebar */}
        <LeftSidebar
          activeMenu={activeMenu}
          onMenuChange={setActiveMenu}
          isDark={isDark}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex transition-all duration-300 min-w-0">
          {/* Central Panel */}
          <div className="flex-1 overflow-auto lg:overflow-hidden lg:flex lg:flex-col">
            {renderMainContent()}
          </div>

          {/* Right Sidebar - Hidden on mobile/tablet */}
          <div className="hidden xl:block">
            <RightSidebar isDark={isDark} />
          </div>
        </main>
      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot isDark={isDark} />

      {/* Background Effects - Responsive sizes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 rounded-full blur-3xl animate-pulse bg-blue-500/5 dark:bg-purple-500/10" />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 rounded-full blur-3xl animate-pulse bg-purple-500/5 dark:bg-cyan-500/10"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: isDark ? "#1e293b" : "#ffffff",
            color: isDark ? "#f1f5f9" : "#1e293b",
            border: isDark
              ? "1px solid #7c3aed"
              : "1px solid #3b82f6",
          },
        }}
      />
    </div>
  );
}