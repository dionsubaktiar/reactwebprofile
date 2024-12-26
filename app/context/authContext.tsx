import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  provider: string | null;
  provider_id: string | null;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isRestoringAuth: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isRestoringAuth, setIsRestoringAuth] = useState<boolean>(true);

  // Restore authentication state from localStorage on initialization
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    console.log("Restoring state from localStorage");
    console.log("Stored Token:", storedToken);
    console.log("Stored User:", storedUser);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        console.log("Auth state restored successfully.");
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        logout(); // Clear invalid data
      }
    }

    setIsRestoringAuth(false); // Mark as done restoring auth state
  }, []);

  const setAuth = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    console.log("Auth state updated and persisted.");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    console.log("Auth state cleared.");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, isRestoringAuth, setAuth, logout }}
    >
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
