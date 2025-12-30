import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'; // Import React Router hook

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Tab Views
import Profile from './components/tabviews/Profile'; 
import University from './components/tabviews/University';
import Scholarship from './components/tabviews/Scholarship';
import Settings from './components/tabviews/Settings';
import Students from "./components/tabviews/students/page"
import Mentor from "./components/tabviews/mentor/page"
import BlogList from './components/tabviews/Blog';
import LegalTabs from './components/tabviews/legals/LegalMain';
import EnquiryDashboard from './components/tabviews/Enquiry';
import EventsDashboard from './components/tabviews/Events';
import HelpSupport from './components/tabviews/HelpSupport';
import NewsDashboard from './components/tabviews/NewsAndUpdate';

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

  // 1. Get the current tab from the URL
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // 2. Logic to determine which component to render based on URL param
  const renderContent = () => {
    switch (activeTab) {
      case 'university': return <University />;
      case 'students': return <Students />;
      case 'mentor': return <Mentor />;
      case 'blog': return <BlogList />;
      case 'scholarship': return <Scholarship />;
      case 'settings': return <Settings />;
      case 'legals': return <LegalTabs />;
      case 'enquiry': return <EnquiryDashboard />;
      case 'events': return <EventsDashboard />;
      case 'helpandsupport': return <HelpSupport />;
      case 'newsandupdate': return <NewsDashboard />;
      case 'profile': return <Profile />;
      default: return <Profile />;
    }
  };

  return (
    <div className="flex h-screen bg-[var(--bg-light)] font-sans text-slate-800 overflow-hidden">
      <ScrollbarStyles />
      <Sidebar
        isDesktopOpen={isDesktopOpen}
        isMobileOpen={isMobileOpen}
        closeMobile={() => setIsMobileOpen(false)}
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