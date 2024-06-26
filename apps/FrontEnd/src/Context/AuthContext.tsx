import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  isAdminPage: boolean;
  login: (token: string) => void;
  logout: () => void;
  setIsAdminPage: (isAdminPage: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdminPage, setIsAdminPage] = useState<boolean>(false);

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("jwtToken", token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdminPage(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdminPage, login, logout, setIsAdminPage }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
