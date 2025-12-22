import { useNavigate } from "react-router-dom";
import { User, GraduationCap, ShieldCheck } from "lucide-react";

export default function RoleSelect() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "User",
      desc: "Browse content, book services, and manage your profile",
      path: "/user/home",
      gradient: "from-blue-500 to-indigo-600",
      icon: User,
    },
    {
      title: "Mentor",
      desc: "Guide users, manage sessions, and track progress",
      path: "/mentor/dashboard",
      gradient: "from-emerald-500 to-teal-600",
      icon: GraduationCap,
    },
    {
      title: "Admin",
      desc: "Control platform settings, users, and analytics",
      path: "/admin",
      gradient: "from-orange-500 ",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
            Choose Your Role
          </h1>
          <p className="mt-4 text-slate-600 text-lg max-w-xl mx-auto">
            Select how you want to continue. Your experience will be customized
            based on your role.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <button
                key={role.title}
                onClick={() => navigate(role.path)}
                className="group relative text-left focus:outline-none"
              >
                <div
                  className={`absolute inset-0 rounded-3xl 
                  opacity-20 blur-xl group-hover:opacity-40 transition`}
                />

                {/* Card */}
                <div
                  className="relative h-full rounded-lg hover:shadow-sm bg-gray-50 backdrop-blur-xl
                  p-8   transition-all duration-300
                  group-hover:-translate-y-2 "
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient}
                    flex items-center justify-center text-white mb-6`}
                  >
                    <Icon size={26} />
                  </div>

                  {/* Content */}
                  <h2 className="!text-xl font-semibold text-slate-800 mb-3">
                    {role.title}
                  </h2>

                  <p className="text-slate-600 leading-relaxed">
                    {role.desc}
                  </p>

                  {/* Action */}
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                    Continue
                    <span className="transition group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
