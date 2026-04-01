import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";
import StudentLayout from "./layouts/StudentLayout";
import AdminLayout from "./layouts/AdminLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentAchievements from "./pages/student/StudentAchievements";
import StudentProfile from "./pages/student/StudentProfile";
import StudentReport from "./pages/student/StudentReport";
import StudentSettings from "./pages/student/StudentSettings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminManageAchievements from "./pages/admin/AdminManageAchievements";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminReport from "./pages/admin/AdminReport";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />

          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="achievements" element={<StudentAchievements />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="report" element={<StudentReport />} />
            <Route path="settings" element={<StudentSettings />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="manage-achievements" element={<AdminManageAchievements />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="report" element={<AdminReport />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
