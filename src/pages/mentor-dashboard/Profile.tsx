'use client'

import { Edit } from "lucide-react";

const MentorProfilePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= PAGE TITLE ================= */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Mentor Profile
          </h3>
          <p className="text-slate-500 mt-1">
            Manage your profile, expertise, and availability
          </p>
        </div>

        {/* ================= PROFILE HEADER ================= */}
        <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg p-6 sm:p-8 text-white shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                AM
              </div>

              <button
                className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-white text-emerald-600
                flex items-center justify-center shadow hover:scale-105 transition"
                title="Edit avatar"
              >
                <Edit size={14} />
              </button>
            </div>

            {/* Name & Role */}
            <div>
              <h3 className="text-2xl font-bold">Amit Mishra</h3>
              <p className="text-white/90 mt-1">
                Senior Career Mentor
              </p>
              <p className="text-white/70 text-sm mt-2">
                6+ years mentoring experience
              </p>
            </div>
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Students Mentored" value="320+" />
          <StatCard label="Sessions Conducted" value="1,150" />
          <StatCard label="Average Rating" value="4.9 ★" />
          <StatCard label="Active Students" value="42" />
        </div>

        {/* ================= ABOUT ================= */}
        <Card title="About Mentor">
          <p className="text-slate-600 leading-relaxed">
            I am a dedicated career mentor specializing in student counseling,
            university admissions, and scholarship guidance. I help students
            build clarity and confidence through personalized mentoring
            strategies and long-term academic planning.
          </p>
        </Card>

        {/* ================= EXPERTISE ================= */}
        <Card title="Areas of Expertise">
          <div className="flex flex-wrap gap-3">
            {[
              "Career Counseling",
              "University Admissions",
              "Scholarship Guidance",
              "Study Abroad",
              "Resume Building",
              "Interview Preparation",
            ].map(skill => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-emerald-50
                text-emerald-700 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>

        {/* ================= CONTACT & AVAILABILITY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card title="Contact Information">
            <div className="space-y-4">
              <InfoField label="Email" value="amit.mentor@example.com" />
              <InfoField label="Phone" value="+9143210 98765 " />
              <InfoField label="Location" value="India (Online Sessions)" />
            </div>
          </Card>

          <Card title="Availability">
            <div className="space-y-3">
              <AvailabilityItem day="Monday – Friday" time="10:00 AM – 7:00 PM" />
              <AvailabilityItem day="Saturday" time="10:00 AM – 2:00 PM" />
              <AvailabilityItem day="Sunday" time="Unavailable" />
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Card = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-slate-100 p-6 shadow-sm hover:shadow-md transition">
    <h3 className="text-lg font-semibold text-slate-800 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-lg border border-slate-100 p-6 shadow-sm hover:shadow-md transition">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="text-2xl font-bold text-slate-800 mt-2">{value}</p>
  </div>
);

const InfoField = ({ label, value }) => (
  <div>
    <p className="text-sm text-slate-500">{label}</p>
    <p className="font-medium text-slate-800 mt-1">{value}</p>
  </div>
);

const AvailabilityItem = ({ day, time }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-slate-600">{day}</span>
    <span className="font-medium text-slate-800">{time}</span>
  </div>
);

export default MentorProfilePage;
