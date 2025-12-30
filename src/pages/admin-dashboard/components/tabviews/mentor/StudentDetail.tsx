'use client'

import React, { useState } from 'react';
import {
    ArrowLeft, Mail, Phone, Calendar, MapPin,
     BookOpen, StickyNote,
    Plus, Search, Filter, 
    CheckCircle2, XCircle, 
} from 'lucide-react';

// ✅ FIX 1: Changed path to './types' (plural) to match your folder structure
import type { Mentor } from './type';
import { StatusBadge, Avatar } from './UIHelpers';
import { Link } from 'react-router-dom';

// ================= TYPES & INTERFACES =================

interface Participant {
    id: number;
    name: string;
    email: string;
    role: string;
    course: string;
    status: 'Active' | 'Inactive' | 'Pending';
    joinDate: string;
    progress: number;
}

// --- Component Prop Interfaces ---

interface StudentDetailProps {
    student: Mentor;
    onBack: () => void;
}

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

interface InfoCardProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

// ================= MAIN COMPONENT =================

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onBack }) => {
    // Default to 'participants' so you can see the new table immediately
    const [activeTab, setActiveTab] = useState<string>('overview');

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 animate-in fade-in zoom-in duration-300">
            <div className="space-y-6">

                {/* ================= TOP NAVIGATION ================= */}
                <nav className="flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors bg-white px-3 py-2 rounded-md border border-slate-200 hover:shadow-xs"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to Dashboard
                    </button>
                </nav>

                {/* ================= HERO HEADER CARD ================= */}
                <div className="bg-white rounded-md shadow-xs p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="flex flex-col md:flex-row gap-6 relative z-10">
                        <div className="flex-shrink-0">
                            <Avatar name={student.name} size="xl" />
                        </div>

                        <div className="flex-grow space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{student.name}</h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-slate-500">
                                        <span className="flex items-center text-xs gap-1.5 bg-purple-100 px-2.5 py-1 rounded-md text-purple-700 font-medium">
                                            <BookOpen className="w-3 h-3" />
                                            {student.specialization}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                            ID: #{student.id}992
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            Online
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 border-t border-slate-100 mt-4">
                                <div className="flex items-center gap-3">
                                    <p className="text-xs! font-semibold uppercase tracking-wider text-slate-400">Current Status</p>
                                    <StatusBadge status={student.status} />
                                </div>
                                <div className="hidden sm:block w-px h-8 bg-slate-100"></div>
                                <div className="space-y-1 flex-grow max-w-md">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span className="text-slate-500">Overall Course Progress</span>
                                        <span className="text-slate-900">{student.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${student.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= TAB NAVIGATION ================= */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200">
                    <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                        <TabButton label="Dashboard" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
                        <TabButton label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                        {/* Renamed Label to Participants List */}
                        <TabButton label="Participants List" isActive={activeTab === 'participants'} onClick={() => setActiveTab('participants')} />
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-md text-xs text-amber-700 mb-2">
                        <StickyNote className="w-3.5 h-3.5" />
                        <span className="font-medium">Note:</span> Review pending approvals by EOD.
                    </div>
                </div>

                {/* ================= CONTENT AREA ================= */}
                <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'overview' && <OverviewTab />}
                    {activeTab === 'profile' && <ProfileTab student={student} />}
                    {activeTab === 'participants' && <ParticipantsListTab />}
                </div>
            </div>
        </div>
    );
};

// ================= TAB 3: PARTICIPANTS LIST (TABLE FORMAT) =================

const ParticipantsListTab = () => {
    // Mock Data for the Table
    const participants: Participant[] = [
        { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Student", course: "React Basics", status: "Active", joinDate: "Jan 12, 2024", progress: 85 },
        { id: 2, name: "Robert Smith", email: "robert.s@domain.com", role: "Student", course: "Advanced Node", status: "Active", joinDate: "Feb 05, 2024", progress: 40 },
        { id: 3, name: "Emily Davis", email: "emily.d@test.com", role: "Student", course: "UI/UX Design", status: "Inactive", joinDate: "Mar 22, 2024", progress: 10 },
        { id: 4, name: "Michael Brown", email: "m.brown@web.com", role: "Mentor", course: "Full Stack", status: "Active", joinDate: "Nov 10, 2023", progress: 100 },
        { id: 5, name: "Sarah Wilson", email: "sarah.w@tech.io", role: "Student", course: "Python 101", status: "Pending", joinDate: "May 15, 2024", progress: 0 },
        { id: 6, name: "David Lee", email: "david.lee@code.com", role: "Student", course: "React Basics", status: "Active", joinDate: "Apr 02, 2024", progress: 65 },
        { id: 7, name: "Sophia Miller", email: "sophia.m@art.com", role: "Student", course: "UI/UX Design", status: "Active", joinDate: "Jan 30, 2024", progress: 92 },
    ];

    return (
        <div className="space-y-6">
            
            {/* Table Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900">Program Participants</h3>
                    <p className="text-slate-500 text-sm mt-1">Manage users enrolled in this cohort.</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search participants..." 
                            className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full sm:w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
                        <Plus className="w-4 h-4" />
                        Add New
                    </button>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Participant Name</th>
                                <th className="px-6 py-4">Course Enrolled</th>
                                <th className="px-6 py-4">Join Date</th>
                                <th className="px-6 py-4">Progress</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {participants.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    
                                    {/* Name Column */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Course Column */}
                                    <td className="px-6 py-4 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-slate-400" />
                                            {user.course}
                                        </div>
                                    </td>

                                    {/* Date Column */}
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {user.joinDate}
                                    </td>

                                    {/* Progress Column */}
                                    <td className="px-6 py-4 align-middle">
                                        <div className="w-full max-w-[140px]">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="font-medium text-slate-700">{user.progress}%</span>
                                            </div>
                                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                                                <div 
                                                    className={`h-1.5 rounded-full ${
                                                        user.progress === 100 ? 'bg-emerald-500' : 
                                                        user.progress > 50 ? 'bg-indigo-500' : 'bg-amber-500'
                                                    }`} 
                                                    style={{ width: `${user.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status Column */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                            user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            user.status === 'Inactive' ? 'bg-slate-100 text-slate-600 border-slate-200' :
                                            'bg-amber-50 text-amber-700 border-amber-100'
                                        }`}>
                                            {user.status === 'Active' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                                            {user.status === 'Inactive' && <XCircle className="w-3 h-3 mr-1" />}
                                            {user.status}
                                        </span>
                                    </td>

                                    {/* Actions Column */}
                                    <td className="px-6 py-4 text-right">
                                      <Link to={`/admin/dashboard?tab=students&id=${user.id}`}>
                                      View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Simple Pagination Footer */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Showing 1 to 7 of 24 entries</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-300 rounded-md text-xs font-medium text-slate-600 hover:bg-white disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 border border-slate-300 rounded-md text-xs font-medium text-slate-600 hover:bg-white">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ================= SUB-COMPONENTS (Overview & Profile) =================

const OverviewTab = () => {
    return (
        <div className="space-y-6">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FCD34D] p-6 rounded-md shadow-sm flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden min-h-[140px]">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full"></div>
                    <h4 className="text-slate-800 font-medium text-sm">Total Courses</h4>
                    <span className="text-4xl font-bold text-slate-900">07</span>
                    <p className="text-xs text-slate-800/80 font-medium mt-1">2 Electives</p>
                </div>
                <div className="bg-[#FFCACA] p-6 rounded-md shadow-sm flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden min-h-[140px]">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full"></div>
                    <h4 className="text-rose-900 font-medium text-sm">Attendance</h4>
                    <span className="text-4xl font-bold text-rose-950">60%</span>
                    <p className="text-xs text-rose-800/80 font-medium mt-1">24% Absent</p>
                </div>
                <div className="bg-[#CFD8DC] p-6 rounded-md shadow-sm flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden min-h-[140px]">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/20 rounded-full"></div>
                    <h4 className="text-slate-700 font-medium text-sm">Requested Leaves</h4>
                    <span className="text-4xl font-bold text-slate-800">17</span>
                    <p className="text-xs text-slate-600 font-medium mt-1">11 Approved</p>
                </div>
            </div>
        </div>
    );
};

const ProfileTab: React.FC<{ student: Mentor }> = ({ student }) => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-md shadow-xs">
                <h3 className="text-xl font-bold text-slate-900 mb-4">About Student</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                    {student.bio || "Focused on Full Stack Development with React and Node.js."}
                </p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-xs">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoCard icon={Mail} label="EMAIL ADDRESS" value={student.email} />
                    <InfoCard icon={Phone} label="PHONE NUMBER" value={student.phone} />
                    <InfoCard icon={Calendar} label="DATE JOINED" value={student.date} />
                    <InfoCard icon={MapPin} label="LOCATION" value="New Delhi, India" />
                </div>
            </div>
        </div>
        <div className="xl:col-span-1">
            <div className="bg-[#312E81] p-6 rounded-md shadow-xs text-white h-fit">
                <h3 className="text-xl font-bold mb-1">Mentorship Session</h3>
                <p className="text-indigo-200 text-sm mb-6">Next scheduled session</p>
                <div className="bg-white/10 rounded-xl p-4 flex items-center gap-4 mb-6 border border-white/10 backdrop-blur-sm">
                    <div className="p-2">
                      <Calendar className="w-5 h-5 text-indigo-200" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Thursday, 24 Oct</p>
                      <p className="text-indigo-200 text-xs">4:00 PM - 5:00 PM</p>
                    </div>
                </div>
                <button className="w-full bg-white text-[#312E81] font-bold py-3 px-4 rounded-xl hover:bg-indigo-50 transition-colors text-sm shadow-sm">
                  Reschedule
                </button>
            </div>
        </div>
    </div>
);

// ================= HELPERS =================

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap ${isActive
            ? "text-indigo-600 border-b-2 border-indigo-600"
            : "text-slate-500 hover:text-slate-800 border-b-2 border-transparent hover:border-slate-300"
            }`}
        style={{ marginBottom: '-1px' }}
    >
        {label}
    </button>
);

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-50/50 border border-slate-100/50">
        <div className="bg-white p-2.5 rounded-md border border-slate-100 text-slate-400 shadow-sm">
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
            <p className="text-sm font-bold text-slate-700">{value || "N/A"}</p>
        </div>
    </div>
);

export default StudentDetail;