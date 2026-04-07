export type AchievementStatus = "Approved" | "Pending" | "Rejected";

export interface Achievement {
  id: string | number;
  title: string;
  description?: string;
  category: string;
  date: string;
  studentName?: string;
  status: AchievementStatus | null;
}
