import React from 'react';
import { PanelLeft, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

// 1. Define the interface for the component props
interface HeaderProps {
  toggleDesktop: () => void;
  toggleMobile: () => void;
}

// 2. Apply the interface to the component
const Header: React.FC<HeaderProps> = ({ toggleDesktop, toggleMobile }) => {
  return (
    <header className="p-2 px-3 flex items-center justify-between bg-[var(--bg-main)] flex-shrink-0 sticky top-0 z-30">
      {/* LEFT: Sidebar Toggle & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <button
          onClick={() => {
            if (window.innerWidth >= 768) {
              toggleDesktop();
            } else {
              toggleMobile();
            }
          }}
          className="p-2 bg-[var(--bg-light)] rounded-md shadow-xs hover:bg-[var(--purple-subtle)] hover:text-[var(--purple)] transition-all hover:shadow-sm"
        >
          <PanelLeft size={20} />
        </button>
        
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-11 pr-4 py-2 rounded-xl bg-white border border-[var(--border)] shadow-xs text-sm focus:ring-1 focus:ring-[var(--purple-subtle)] focus:border-[var(--purple-subtle)] outline-none transition-all"
          />
          <Search className="absolute left-4 top-3 text-[var(--purple)] h-4 w-4" />
        </div>
      </div>

      {/* RIGHT: Notifications & Profile */}
      <div className="flex items-center space-x-3 ml-4">
        <button className="hidden sm:flex p-2 bg-[var(--bg-light)] rounded-md shadow-xs border border-gray-100 hover:bg-[var(--purple-subtle)] hover:text-[var(--purple)] transition-all relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center px-4 ml-1 sm:border-l border-[var(--border)]">
          <div className="text-right mr-3 px-2 hidden sm:block">
            <p className="text-[var(--text-subtle)] font-medium text-sm">Student</p>
            <p className="font-bold text-gray-800">Jannelia</p>
          </div>
          <Link to="/mentor/profile">
            <div className="h-12 w-12 cursor-pointer rounded-full overflow-hidden border border-gray-200">
              <img
                src="/img/profile.png"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;