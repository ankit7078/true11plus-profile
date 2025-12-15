import React, { useState } from 'react';
import {
  LayoutGrid, ClipboardList, Settings, LogOut, Search, Bell, Layers, Flag, Trash2, Clock,
  TrendingUp, Target, Award, Calendar, CalendarDays,
  GraduationCap, Circle, ChevronRight, PanelLeft, Star, X,
  User, Mail, BookOpen, CheckCircle,type LucideIcon
} from 'lucide-react';

// --- 1. TYPES & INTERFACES ---

interface OverviewStat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

interface Deadline {
  id: number;
  title: string;
  type: string;
  date: string;
}

interface TopMatch {
  id: number;
  name: string;
  matchLabel: string;
  matchScore: string;
  goodMatchReasons: string[];
  improvementTips: string[];
}

interface University {
  id: number;
  name: string;
  chance: string;
  match: string;
  goodMatchReasons: string[];
  improvementTips: string[];
}

interface Scholarship {
  id: number;
  title: string;
  university: string;
  amount: string;
  status: string;
  deadline: string;
  requirements: string[];
}

interface Task {
  id: number;
  title: string;
  createdDate: string;
  priority: string;
  dueDate: string;
  status: string;
  assignee: string;
  iconColor: string;
}

// --- 2. UTILITY & DATA ---

const ScrollbarStyles = () => (
  <style>{`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}</style>
);

const overviewStats: OverviewStat[] = [
  { label: 'Profile Score', value: '85/100', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Universities', value: '3', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Scholarships', value: '2', icon: Award, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Deadlines', value: '3', icon: Calendar, color: 'text-red-600', bg: 'bg-red-50' },
];

const deadlineData: Deadline[] = [
  { id: 1, title: "Stanford University", type: "Application", date: "January 15, 2025" },
  { id: 2, title: "MIT", type: "Application", date: "January 1, 2025" },
  { id: 3, title: "University of Toronto", type: "Scholarship", date: "February 1, 2025" },
];

const topMatchesData: TopMatch[] = [
  {
    id: 1, name: "Stanford University", matchLabel: "75% Match", matchScore: "92/100",
    goodMatchReasons: ["Strong Computer Science program", "Excellent research opportunities"],
    improvementTips: ["Improve SAT score to 1500+", "Complete calculus course"]
  },
  {
    id: 2, name: "MIT", matchLabel: "65% Match", matchScore: "88/100",
    goodMatchReasons: ["Top engineering programs", "Innovation focus"],
    improvementTips: ["Maintain GPA above 3.8", "Complete physics courses"]
  }
];

const universityData: University[] = [
  {
    id: 1, name: "MIT", chance: "65%", match: "88/100",
    goodMatchReasons: ["Top engineering programs", "Innovation focus", "Strong alumni network"],
    improvementTips: ["Maintain GPA above 3.8", "Complete physics courses", "Participate in science competitions"]
  },
  {
    id: 2, name: "University of Toronto", chance: "85%", match: "90/100",
    goodMatchReasons: ["Affordable tuition", "Diverse programs", "International recognition"],
    improvementTips: ["Submit English proficiency test", "Complete application essays", "Provide recommendation letters"]
  },
  {
    id: 3, name: "Stanford University", chance: "75%", match: "92/100",
    goodMatchReasons: ["Strong Computer Science program", "Excellent research opportunities", "Good financial aid"],
    improvementTips: ["Improve SAT score to 1500+", "Complete calculus course", "Add leadership experience"]
  }
];

const scholarshipData: Scholarship[] = [
  {
    id: 1, title: "Merit Scholarship", university: "Stanford University", amount: "$25,000", status: "Eligible", deadline: "March 1, 2025",
    requirements: ["GPA above 3.5", "Leadership experience"]
  },
  {
    id: 2, title: "International Student Aid", university: "University of Toronto", amount: "$15,000", status: "Eligible", deadline: "February 15, 2025",
    requirements: ["Financial need demonstration", "Academic excellence"]
  }
];

// --- 3. SUB-COMPONENTS (VIEWS) ---

const OverviewView: React.FC = () => (
  <div className="space-y-8 animate-in fade-in duration-500 pb-10">
    {/* Welcome Banner */}
    <div className="bg-gradient-to-r from-[#1a56db] to-[#2563eb] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className=" font-bold mb-2">Welcome back, John!</h3>
        <p className="text-blue-100 mb-6 max-w-2xl">Your overall profile score is 85/100. Here's what's happening with your applications.</p>
        <div className="flex flex-wrap gap-4">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium border border-white/10 flex items-center">
            <Target className="w-4 h-4 mr-2 text-blue-200" /> Universities Matched: 3
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium border border-white/10 flex items-center">
            <Award className="w-4 h-4 mr-2 text-yellow-200" /> Scholarships Available: 2
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-400/20 rounded-full blur-xl"></div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {overviewStats.map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between">
          <div><p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-1">{stat.label}</p><h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3></div>
          <div className={`${stat.bg} p-3 rounded-full`}><stat.icon className={`w-7 h-7 ${stat.color}`} /></div>
        </div>
      ))}
    </div>

    {/* Top University Matches */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Top University Matches</h3>
        <button className="text-indigo-600 text-sm font-medium hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {topMatchesData.map((uni) => (
          <div key={uni.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-indigo-100 transition-colors">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 font-bold border border-gray-100">{uni.name.charAt(0)}</div>
                <h4 className="text-xl font-bold text-gray-900">{uni.name}</h4>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{uni.matchLabel}</span>
                <div className="flex items-center text-yellow-500 font-bold text-sm"><Star className="w-4 h-4 fill-current mr-1" />{uni.matchScore}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-3">Why it's a good match</p>
                <ul className="space-y-2">{uni.goodMatchReasons.map((r, i) => (<li key={i} className="flex items-start text-sm text-gray-700"><Circle className="w-2 h-2 mr-2 mt-1.5 fill-indigo-500 text-indigo-500 flex-shrink-0" />{r}</li>))}</ul>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-3">To improve your chances</p>
                <ul className="space-y-2">{uni.improvementTips.map((t, i) => (<li key={i} className="flex items-start text-sm text-gray-700"><Circle className="w-2 h-2 mr-2 mt-1.5 fill-orange-500 text-orange-500 flex-shrink-0" />{t}</li>))}</ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Upcoming Deadlines */}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Deadlines</h3>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {deadlineData.map((item, index) => (
          <div key={item.id} className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-red-50/30 hover:bg-red-50/50 transition-colors ${index !== deadlineData.length - 1 ? 'border-b border-red-100' : ''}`}>
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white rounded-lg border border-red-100 text-red-500 shadow-sm"><CalendarDays className="w-5 h-5" /></div>
              <div><h5 className="font-bold text-gray-900 text-sm">{item.title}</h5><p className="text-gray-500 text-xs">{item.type}</p></div>
            </div>
            <div className="text-red-700 font-bold text-sm text-right w-full sm:w-auto bg-white/50 px-3 py-1 rounded-lg border border-red-100/50">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const UniversityView: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-500 pb-10">
    <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-2">
      <div>
        <h3 className=" font-bold text-gray-900">University Recommendations</h3>
        <p className="text-gray-500 text-sm mt-1">Schools that match your profile and goals.</p>
      </div>
    </div>

    {universityData.map((uni) => (
      <div key={uni.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{uni.name}</h3>
          </div>
          <div className="flex items-center space-x-3 font-medium">
            <div className="px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold">{uni.chance} Chance</div>
            <div className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">{uni.match} Match</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div><h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> Why it's a good match</h4><ul className="space-y-3">{uni.goodMatchReasons.map((r, i) => (<li key={i} className="flex items-start text-gray-600 text-sm"><CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />{r}</li>))}</ul></div>
          <div><h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> To improve your chances</h4><ul className="space-y-3">{uni.improvementTips.map((t, i) => (<li key={i} className="flex items-start text-gray-600 text-sm"><TrendingUp className="w-4 h-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" />{t}</li>))}</ul></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-50 gap-4">
          <button className="text-indigo-600 font-medium flex items-center hover:underline">View University Details <ChevronRight className="w-5 h-5 ml-1" /></button>
          <button className="w-full sm:w-auto bg-[#1a56db] hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-lg shadow-blue-200">Connect with Mentor</button>
        </div>
      </div>
    ))}
  </div>
);

const ScholarshipView: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-500 pb-10">
    <div className="mb-2">
      <h3 className="font-bold text-gray-900">Scholarship Opportunities</h3>
      <p className="text-gray-500 ">Financial aid options curated for you.</p>
    </div>

    {scholarshipData.map((item) => (
      <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div><h3 className="text-xl font-bold text-gray-900">{item.title}</h3><p className="text-gray-500 text-sm flex items-center mt-1"><GraduationCap className="w-4 h-4 mr-1" /> {item.university}</p></div>
          <div className="text-left sm:text-right"><h3 className="text-3xl font-bold text-[#16a34a]">{item.amount}</h3><div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mt-1">{item.status}</div></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Requirements</h4>
            <ul className="space-y-3">{item.requirements.map((req, i) => (<li key={i} className="flex items-center text-gray-700 text-sm font-medium"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3 flex-shrink-0"></div>{req}</li>))}</ul>
          </div>
          <div className="flex flex-col justify-center pl-0 md:pl-4">
            <h4 className="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Application Deadline</h4>
            <div className="flex items-center text-[#dc2626] font-bold text-lg"><Calendar className="w-5 h-5 mr-2" />{item.deadline}</div>
            <p className="text-xs text-gray-400 mt-1">Don't miss the date!</p>
          </div>
        </div>
        <div className="pt-2"><button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-green-100">Apply for Scholarship</button></div>
      </div>
    ))}
  </div>
);

const SettingsView: React.FC = () => (
  <div className="space-y-6 animate-in fade-in duration-500 pb-10">
    <h3 className="font-bold text-gray-900 mb-2">Profile Settings</h3>
    <p className="text-gray-500 text-sm mt-1">Schools that match your profile and goals.</p>

    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <User className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div><label className="block text-sm font-bold text-gray-700 mb-2">First Name</label><input type="text" defaultValue="John" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 bg-gray-50/50" /></div>
        <div><label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label><input type="text" defaultValue="Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 bg-gray-50/50" /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div><label className="block text-sm font-bold text-gray-700 mb-2">Email</label><div className="relative"><Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" /><input type="email" defaultValue="rajat@gmail.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 bg-gray-50/50" /></div></div>
        <div><label className="block text-sm font-bold text-gray-700 mb-2">Role</label><input type="text" defaultValue="Student" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 bg-gray-50/50" /></div>
      </div>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <BookOpen className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-900">Academic Profile</h3>
      </div>
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl"><p className="text-xs text-gray-500 uppercase font-bold">Current Grade</p><p className="font-medium text-gray-900 mt-1">12th Grade</p></div>
          <div className="p-4 bg-gray-50 rounded-xl"><p className="text-xs text-gray-500 uppercase font-bold">GPA</p><p className="font-medium text-gray-900 mt-1">3.8/4.0</p></div>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl"><p className="text-xs text-gray-500 uppercase font-bold">Interests</p><p className="font-medium text-gray-900 mt-1">Computer Science, Artificial Intelligence, Robotics</p></div>
      </div>
      <button className="bg-[#1a56db] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-100">Retake Assessment</button>
    </div>
  </div>
);

interface TasksViewProps {
  tasks: Task[];
  handleDelete: (id: number) => void;
}

const TasksView: React.FC<TasksViewProps> = ({ tasks, handleDelete }) => (
  <div className="space-y-4 animate-in fade-in duration-500 pb-10">
    <div>
      <h3 className="font-bold text-gray-900 ">Manage Task</h3>
      <p className="text-gray-500">Schools that match your profile and goals.</p>
    </div>
    {tasks.map(task => (
      <div key={task.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex gap-4">
            <div className={`w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center ${task.iconColor}`}><Layers className="h-6 w-6" /></div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{task.createdDate}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <div className="flex items-center text-gray-700"><Layers className="w-4 h-4 mr-1" />{task.priority}</div>
                <div className="flex items-center text-red-400"><Clock className="w-4 h-4 mr-1" />{task.dueDate}</div>
                <div className={`flex items-center ${task.status === 'Completed' ? 'text-green-600' : 'text-gray-700'}`}><Flag className="w-4 h-4 mr-1" />{task.status}</div>
                <div className="flex items-center text-gray-700"><div className="w-5 h-5 bg-gray-200 rounded-full mr-1 flex items-center justify-center text-xs font-bold">{task.assignee.charAt(0)}</div>{task.assignee}</div>
              </div>
            </div>
          </div>
          <button onClick={() => handleDelete(task.id)} className="px-4 py-1 border border-red-200 text-red-500 rounded-full hover:bg-red-50 text-sm font-medium transition-colors flex items-center"><Trash2 className="w-3 h-3 mr-1" /> Delete</button>
        </div>
      </div>
    ))}
  </div>
);

// --- 4. LAYOUT COMPONENTS ---

interface SidebarProps {
  isDesktopOpen: boolean;
  isMobileOpen: boolean;
  closeMobile: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  tabId: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isDesktopOpen, isMobileOpen, closeMobile, activeTab, setActiveTab }) => {
  const showTooltip = !isDesktopOpen;

  const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, tabId }) => (
    <button
      onClick={() => { setActiveTab(tabId); closeMobile(); }}
      className={`group relative w-full flex items-center space-x-3 px-3 py-2.5 cursor-pointer rounded-lg transition-all duration-200 font-medium ${activeTab === tabId
        ? 'bg-purple-50 text-purple-600 shadow-sm border border-purple-200'
        : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'
        }`}
    >
      <Icon className={`h-4 w-4 flex-shrink-0 ${activeTab === tabId ? 'text-purple-600' : 'text-gray-400 group-hover:text-purple-600'}`} />
      <span className={`whitespace-nowrap transition-all duration-300 ${isMobileOpen ? 'opacity-100 w-auto' : ''} ${!isMobileOpen && isDesktopOpen ? 'opacity-100 w-auto' : ''} ${!isMobileOpen && !isDesktopOpen ? 'opacity-0 w-0 overflow-hidden' : ''}`}>{label}</span>
      {showTooltip && !isMobileOpen && (
        <span className="hidden md:block absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">{label}</span>
      )}
    </button>
  );

  return (
    <>
      <div className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isMobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={closeMobile}></div>
      <div className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out shadow-2xl md:shadow-none ${isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72'} md:translate-x-0 md:relative ${isDesktopOpen ? 'md:w-62' : 'md:w-17'}`}>
        <div className="p-3 h-full flex flex-col no-scrollbar overflow-y-auto relative">
          <button onClick={closeMobile} className={`absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 md:hidden ${isMobileOpen ? 'block' : 'hidden'}`}><X size={24} /></button>
          <div
            className={`flex items-center space-x-3 text-indigo-900 text-2xl font-bold pb-5 pl-1
  ${!isDesktopOpen && !isMobileOpen && "md:justify-center"}`}
          >
            <img
              src="/img/favicon.png"
              alt="Logo small"
              className={`w-10 h-10 transition-all duration-300
      ${!isDesktopOpen && !isMobileOpen ? "opacity-100" : "opacity-0 hidden"}
    `}
            />

            {/* Full Logo (Open Sidebar) */}
            <img
              src="/img/logo.png"
              alt="Logo full"
              className={`h-10 transition-all duration-300
      ${isMobileOpen || isDesktopOpen ? "opacity-100" : "opacity-0 hidden"}
    `}
            />
          </div>

          <div className="space-y-8 flex-1">
            <div>
              <p className={`text-xs font-bold text-gray-400 mb-4 px-4 transition-opacity duration-300 ${!isDesktopOpen && !isMobileOpen && 'md:hidden'}`}>GENERAL</p>
              <div className="space-y-2">
                <SidebarItem icon={LayoutGrid} label="Overview" tabId="overview" />
                <SidebarItem icon={GraduationCap} label="University" tabId="university" />
                <SidebarItem icon={Award} label="Scholarship" tabId="scholarship" />
                <SidebarItem icon={ClipboardList} label="Manage Task" tabId="tasks" />
              </div>
            </div>
            <div>
              <p className={`text-xs font-bold text-gray-400 mb-4 px-4 transition-opacity duration-300 ${!isDesktopOpen && !isMobileOpen && 'md:hidden'}`}>OTHERS</p>
              <div className="space-y-2">
                <SidebarItem icon={Settings} label="Settings" tabId="settings" />
              </div>
            </div>
          </div>
          <div className="mt-auto border-t border-gray-100 pt-6">
            <button onClick={() => { alert("Logging out..."); closeMobile(); }} className={`group relative w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-red-500 hover:bg-red-50 hover:shadow-sm`}>
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className={`whitespace-nowrap transition-all duration-300 ${isMobileOpen ? 'opacity-100 w-auto' : ''} ${!isMobileOpen && isDesktopOpen ? 'opacity-100 w-auto' : ''} ${!isMobileOpen && !isDesktopOpen ? 'opacity-0 w-0 overflow-hidden' : ''}`}>Logout</span>
              {showTooltip && !isMobileOpen && (<span className="hidden md:block absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">Logout</span>)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

interface HeaderProps {
  toggleDesktop: () => void;
  toggleMobile: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleDesktop, toggleMobile }) => (
  <header className="px-5 py-3 flex items-center justify-between bg-[var(--bg-main)] flex-shrink-0 sticky top-0 z-30">
    <div className="flex items-center gap-4 flex-1 max-w-xl">

      <button
        onClick={() => { if (window.innerWidth >= 768) { toggleDesktop(); } else { toggleMobile(); } }} className="p-2 bg-[var(--bg-light)] rounded shadow-xs hover:shadow-sm border border-gray-200 text-gray-600 hover:text-purple-600 transition-all cursor-pointer">
        <PanelLeft size={20} />
      </button>

      <div className="relative flex-1 ">
        <input type="text" placeholder="Search..." className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 outline-none transition-all" />
        <Search className="absolute left-4 top-3.5 text-gray-400 h-4 w-4" /></div>
    </div>

    <div className="flex items-center space-x-3 ml-4">
      <button className="hidden sm:flex p-2.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 text-gray-600 transition-all relative"><Bell className="h-5 w-5" /><span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span></button>
      <div className="flex items-center pl-4 ml-1 sm:border-l border-gray-200">
        <div className="text-right mr-3 hidden sm:block"><p className="text-xs text-gray-400 font-medium">Student</p><p className="text-sm font-bold text-gray-900">Jannelia</p></div>
        <div className="h-10 w-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl p-0.5 shadow-md shadow-indigo-200 cursor-pointer hover:scale-105 transition-transform"><img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="h-full w-full object-cover rounded-[10px] border-2 border-white" /></div>
      </div>
    </div>
  </header>
);

// --- 5. MAIN DASHBOARD COMPONENT ---

const TaskDashboard: React.FC = () => {
  const [isDesktopOpen, setIsDesktopOpen] = useState<boolean>(true);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Install Figma on Windows Server", createdDate: "Created at 22 Aug 2024", priority: "High", dueDate: "23 May 2024", status: "In Progress", assignee: "Juliente", iconColor: "bg-blue-100 text-blue-500" },
    { id: 2, title: "Download RAM Upgrade", createdDate: "Created at 22 Aug 2024", priority: "Medium", dueDate: "23 May 2024", status: "Completed", assignee: "Milanio", iconColor: "bg-yellow-100 text-yellow-600" },
    { id: 3, title: "Payment Settings", createdDate: "Created at 22 Aug 2024", priority: "Low", dueDate: "23 May 2024", status: "In Progress", assignee: "Amaratki", iconColor: "bg-purple-100 text-purple-600" }
  ]);

  const handleDelete = (id: number) => setTasks(tasks.filter(task => task.id !== id));

  return (
    <div className="flex h-screen bg-[var(--bg-light)] font-sans text-slate-800 overflow-hidden">
      <ScrollbarStyles />
      <Sidebar isDesktopOpen={isDesktopOpen} isMobileOpen={isMobileOpen} closeMobile={() => setIsMobileOpen(false)} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header toggleDesktop={() => setIsDesktopOpen(!isDesktopOpen)} toggleMobile={() => setIsMobileOpen(!isMobileOpen)} />
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-8 no-scrollbar">
          {activeTab === 'overview' && <OverviewView />}
          {activeTab === 'university' && <UniversityView />}
          {activeTab === 'scholarship' && <ScholarshipView />}
          {activeTab === 'settings' && <SettingsView />}
          {activeTab === 'tasks' && <TasksView tasks={tasks} handleDelete={handleDelete} />}
        </main>
      </div>
    </div>
  );
};

export default TaskDashboard;