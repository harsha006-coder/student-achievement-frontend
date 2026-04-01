import { getCurrentUser } from "@/lib/auth";
import { Shield } from "lucide-react";

const AdminProfile = () => {
  const user = getCurrentUser();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600" />
        <div className="px-6 pb-6 -mt-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-3">{user?.name || "Admin"}</h2>
          <p className="text-gray-500 text-sm">{user?.email || "admin@example.com"}</p>
          <p className="text-gray-500 text-sm mt-1">Role: System Administrator</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
