import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import API from "@/lib/api";
import type { Achievement } from "@/lib/types";
import { getCurrentUser } from "@/lib/auth";

type AchievementContextType = {
  achievements: Achievement[];
  fetchAchievements: () => Promise<void>;
  addAchievement: (achievement: Partial<Achievement>) => Promise<void>;
};

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const AchievementProvider = ({ children }: { children: ReactNode }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  
  const fetchAchievements = async () => {
    const user = getCurrentUser();
    if (!user || user.id === undefined) return;
    try {
      if (user.role && user.role.toLowerCase() === "admin") {
        const res = await API.get(`achievements/all`);
        setAchievements(res.data);
      } else if (user.role && user.role.toLowerCase() === "teacher" && user.userClass) {
        const res = await API.get(`achievements/teacher/${user.userClass}`);
        setAchievements(res.data);
      } else {
        const res = await API.get(`achievements/student/${user.id}`);
        setAchievements(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const addAchievement = async (newAchievement: Partial<Achievement>) => {
    const user = getCurrentUser();
    if (!user || user.id === undefined) return;
    try {
      await API.post(`achievements/add/${user.id}`, newAchievement);
      fetchAchievements();
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