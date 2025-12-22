import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
// 1. IMPORT THE NEW COMPONENT
import Profile from './Profile'; 
import Overview from './components/tabviews/Overview';
import University from './components/tabviews/University';
import Scholarship from './components/tabviews/Scholarship';
import Settings from './components/tabviews/Settings';
import Tasks from './components/tabviews/Tasks';
import MentorTasks from './components/tabviews/mentortask/MentorTask';
import Students from "./components/tabviews/students/page"

// Utility for Scrollbar styles
const ScrollbarStyles = () => (
  <style>{`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

const App = () => {
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Function to determine which component to render
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'university':
        return <University />;
      case 'students':
        return <Students />;
      case 'scholarship':
        return <Scholarship />;
      case 'tasks':
        return <Tasks />;
      case 'mentortasks':
        return <MentorTasks />;
      case 'settings':
        return <Settings />;
      // 2. ADD THE CASE FOR PROFILE
      case 'profile':
        return <Profile />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--bg-light)] font-sans text-slate-800 overflow-hidden">
      <ScrollbarStyles />

      <Sidebar
        isDesktopOpen={isDesktopOpen}
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header
          toggleDesktop={() => setIsDesktopOpen(!isDesktopOpen)}
          toggleMobile={() => setIsMobileOpen(!isMobileOpen)}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-8 no-scrollbar">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;