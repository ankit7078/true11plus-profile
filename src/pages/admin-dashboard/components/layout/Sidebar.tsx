import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  LayoutGrid,
  Users, // Changed for Student
  UserCog, // Changed for Mentor
  GraduationCap,
  Award,
  BookOpen, // Changed for Blog
  Scale, // Changed for Legals
  MessageSquareQuote, // Changed for Enquiry
  CalendarDays, // Changed for Events
  Newspaper, // Changed for New & Update
  LifeBuoy, // Changed for Help & Support
  Settings,
  LogOut,
  X,
  type LucideIcon,
} from 'lucide-react';

// 1. Define Props
interface SidebarProps {
  isDesktopOpen: boolean;
  isMobileOpen: boolean;
  closeMobile: () => void;
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  tabId: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isDesktopOpen,
  isMobileOpen,
  closeMobile,
}) => {
  // 2. Use React Router hook to manage URL params
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current tab from URL, default to 'overview'
  const activeTab = searchParams.get('tab') || 'overview';

  const showTooltip = !isDesktopOpen;

  // Function to update URL
  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId }); // This updates URL to ?tab=tabId
    closeMobile();
  };

  const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, tabId }) => (
    <button
      onClick={() => handleTabChange(tabId)}
      className={`group relative w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 font-medium ${activeTab === tabId
          ? 'bg-purple-50 text-purple-600 border border-purple-100'
          : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'
        }`}
    >
      <Icon className={`h-5 w-5 flex-shrink-0 ${activeTab === tabId ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'}`} />

      <span className={`whitespace-nowrap transition-all duration-300 
        ${isMobileOpen ? 'opacity-100 w-auto' : ''} 
        ${!isMobileOpen && isDesktopOpen ? 'opacity-100 w-auto' : ''} 
        ${!isMobileOpen && !isDesktopOpen ? 'opacity-0 w-0 overflow-hidden' : ''}`}
      >
        {label}
      </span>

      {showTooltip && !isMobileOpen && (
        <span className="hidden md:block absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
          {label}
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={closeMobile}
      />

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out shadow-2xl md:shadow-none 
        ${isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'} 
        md:translate-x-0 md:relative ${isDesktopOpen ? 'md:w-64' : 'md:w-16.5'}`}
      >
        <div className="p-3 h-full flex flex-col no-scrollbar overflow-y-auto relative">

          {/* Close Button (Mobile Only) */}
          <button onClick={closeMobile} className={`absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 md:hidden ${isMobileOpen ? 'block' : 'hidden'}`}>
            <X size={24} />
          </button>

          <div className={`flex items-center pt-2 pb-5 transition-all duration-300 
    ${(!isDesktopOpen && !isMobileOpen) ? "justify-center" : "pl-2"}`}
          >
            {/* Wrap content in Link and point to home/dashboard */}
            <Link to="/" className="block relative hover:opacity-90 transition-opacity">

              {isDesktopOpen || isMobileOpen ? (
                <img
                  src="/img/logo.png"
                  alt="EduDash"
                  className="h-8 w-auto object-contain transition-opacity duration-300"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <img
                  src="/img/favicon.png"
                  alt="E"
                  className="w-8 h-8 object-contain transition-opacity duration-300"
                />
              )}

            </Link>
          </div>

          <div className="space-y-8 flex-1">
            <div>
              <div className="space-y-1.5">
                <SidebarItem icon={LayoutGrid} label="Overview" tabId="profile" />
                <SidebarItem icon={Users} label="Student" tabId="students" />
                <SidebarItem icon={UserCog} label="Mentor" tabId="mentor" />
                {/* <SidebarItem icon={ListTodo} label="Mentor Task" tabId="mentortasks" /> */}
                <SidebarItem icon={GraduationCap} label="University" tabId="university" />
                <SidebarItem icon={Award} label="Scholarship" tabId="scholarship" />
                <SidebarItem icon={BookOpen} label="Blog" tabId="blog" />
                <SidebarItem icon={CalendarDays} label="Events" tabId="events" />
                <SidebarItem icon={Newspaper} label="News & Update" tabId="newsandupdate" />
                <SidebarItem icon={MessageSquareQuote} label="Enquiry" tabId="enquiry" />
                <SidebarItem icon={LifeBuoy} label="Help & Support" tabId="helpandsupport" />
                <SidebarItem icon={Scale} label="Legals" tabId="legals" />
              </div>
            </div>
          </div>

          <div className="mt-auto border-t border-gray-100 pt-4 pb-2 space-y-1.5">
            <SidebarItem icon={Settings} label="Settings" tabId="settings" />

            <button onClick={() => alert("Logging out...")} className="group relative w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 font-medium text-red-500 hover:bg-red-50 hover:shadow-sm">
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className={`whitespace-nowrap transition-all duration-300 ${!isDesktopOpen && !isMobileOpen ? 'opacity-0 w-0 overflow-hidden' : ''}`}>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;