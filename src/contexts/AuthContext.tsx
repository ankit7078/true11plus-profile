import { createContext, useContext, useState, type ReactNode } from "react";

// Define shapes for our data
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (data: any) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 1. Initialize state by checking localStorage first
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem("projectC_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error parsing user from local storage", error);
      return null;
    }
  });
  
  const [loading, setLoading] = useState(false);

  // Mock Login Function
  const login = async (data: any) => {
    setLoading(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const loggedInUser = { 
      id: "1", 
      name: "Demo User", 
      email: data.email 
    };

    // 2. Save user to state AND localStorage
    setUser(loggedInUser);
    localStorage.setItem("projectC_user", JSON.stringify(loggedInUser));
    
    setLoading(false);
  };

  // Mock Signup Function
  const signup = async (data: any) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newUser = { 
      id: "2", 
      name: data.name, 
      email: data.email 
    };

    // Save user to state AND localStorage
    setUser(newUser);
    localStorage.setItem("projectC_user", JSON.stringify(newUser));
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("projectC_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};