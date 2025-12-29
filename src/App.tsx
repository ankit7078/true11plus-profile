import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Footer from "./components/Footer";
import ProfileDetails from "./pages/Public-profile";
import Home from "./pages/Home";
import Tasks from "./pages/tasks/Tasks";
import Assessment from "./pages/Assessment";
import Dashboard from "./pages/mentor-dashboard/Dashboard";
import UserDashboard from "./pages/user-dashboard/Dashboard";
import AdminDashboard from "./pages/admin-dashboard/Dashboard";
import Profile from "./pages/Profile"
import PostProfile from "./pages/Post-profile";
import RoleSelect from "./pages/RoleSelect";
// import MentorProfile from "./pages/mentor-dashboard/Profile";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// Wrapper used to hide Navbar/Footer for specific pages
function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const hideLayoutRoutes = [
    "/mentor/dashboard",
    "/user/dashboard",
    "/mentor/profile",
    "/",
    "/admin/dashboard"
    // "/user",
    // "/mentor",
    // "/admin",
  ]
  // Pages where Navbar & Footer should be hidden
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/user/home" element={<Home />} />
            <Route path="/" element={<RoleSelect />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  < AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/assessment"
              element={
                <ProtectedRoute>
                  <Assessment />
                </ProtectedRoute>
              }
            />
            <Route
              path="/public-profile"
              element={
                <ProtectedRoute>
                  <ProfileDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post-profile"
              element={
                <ProtectedRoute>
                  <PostProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentor/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

export default App;
