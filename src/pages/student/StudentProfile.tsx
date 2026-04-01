import { Trophy, Star, Award } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

const StudentProfile = () => {
  const user = getCurrentUser();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600" />
        <div className="px-6 pb-6 -mt-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg">
            <span className="text-white text-2xl font-bold">{user?.name?.charAt(0) || "S"}</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-3">{user?.name || "Student"}</h2>
          <p className="text-gray-500 text-sm">{user?.email || "student@example.com"}</p>
          <p className="text-gray-500 text-sm">Department: Computer Science</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: Trophy, label: "Total", value: "5" },
          { icon: Star, label: "Approved", value: "3" },
          { icon: Award, label: "Pending", value: "2" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white rounded-xl shadow-md border border-gray-200 p-4 text-center">
            <Icon className="w-6 h-6 mx-auto text-indigo-600 mb-2" />
            <p className="text-xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentProfile;
