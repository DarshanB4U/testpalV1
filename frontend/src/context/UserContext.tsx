import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authService } from "../services/api";

interface UserData {
  name: string;
  recentTests: any[];
  stats: {
    questionsAttempted: number;
    accuracy: number;
  };
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
  updateUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData | null>(null);

  const updateUserData = async () => {
    try {
      const user = authService.getCurrentUserName();

      if (user) {
        const tests: any[] = await authService.getAllTests();
       console.log("this is test data",tests)
        // Assuming you have a function to fetch the user
        // Here you can make an API call to fetch additional user data
        // For now, we'll use mock data
        setUserData({
          name: user.name,
          recentTests: tests, // This should be populated from your API
          stats: {
            questionsAttempted: 0,
            accuracy: 0,
          },
        });
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  useEffect(() => {
    updateUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
