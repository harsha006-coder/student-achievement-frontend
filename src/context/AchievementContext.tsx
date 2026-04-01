import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import API from "@/lib/api";

type Achievement = {
  id: number;
  title: string;
  category: string;
  date: string;
  status: string | null;
};

interface AchievementContextValue {
  achievements: Achievement[];
  fetchAchievements: () => void;
  addAchievement: (newAchievement: {
    title: string;
    category: string;
    date: string;
    status: string | null;
  }) => void;
}

const AchievementContext = createContext<AchievementContextValue | undefined>(undefined);

export const AchievementProvider = ({ children }: { children: ReactNode }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const userId = 1; // 🔥 later replace with login

  // 🔥 FETCH from backend
  const fetchAchievements = async () => {
    try {
      const res = await API.get(`/achievements/student/${userId}`);
      setAchievements(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  // 🔥 ADD via backend
  const addAchievement = async (newAchievement: {
    title: string;
    category: string;
    date: string;
    status: string | null;
  }) => {
    try {
      await API.post(`/achievements/add/${userId}`, newAchievement);
      fetchAchievements(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AchievementContext.Provider value={{ achievements, fetchAchievements, addAchievement }}>
      {children}
    </AchievementContext.Provider>
  );
};

export const useAchievements = () => {
  const context = useContext(AchievementContext);

  if (!context) {
    throw new Error("useAchievements must be used within an AchievementProvider");
  }

  return context;
};