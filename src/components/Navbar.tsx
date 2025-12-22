import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, LayoutDashboard, User, ClipboardList } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";

/* ---------------- TYPES ---------------- */

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  authOnly?: boolean;
}

/* ---------------- DATA ---------------- */

const NAV_ITEMS: NavItem[] = [
  { name: "Home", href: "/user/home", icon: Home },
  { name: "Assessment", href: "/user/assessment", icon: ClipboardList, authOnly: true },
  { name: "Tasks", href: "/user/tasks", icon: ClipboardList, authOnly: true },
  { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard, authOnly: true },
  { name: "Profile", href: "/profile", icon: User, authOnly: true },
];

/* ---------------- COMPONENT ---------------- */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const filteredNav = NAV_ITEMS.filter(
    (item) => !item.authOnly || user
  );

  return (
    <nav className="bg-[var(--bg-main)] border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="/img/logo.png"
              alt="true11plus"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-2">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition
                    ${isActive(item.href)
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                    }`}
                >
                  <Icon size={16} />
                  {item.name}
                </Link>
              );
            })}

            {user ? (
              <button
                onClick={logout}
                className="ml-3 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                }}
                className="ml-3 text-gray-700 hover:text-blue-700 font-medium"
              >
                Sign In
              </button>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {filteredNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition
                    ${isActive(item.href)
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                    }`}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}

            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full mt-2 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setShowAuthModal(true);
                  setIsOpen(false);
                }}
                className="w-full mt-2 border border-blue-700 text-blue-700 px-4 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </nav>
  );
};

export default Navbar;
