'use client'

import React, { useState } from 'react';
import {
    ArrowLeft, Mail, Phone, Calendar, MapPin,
    MoreHorizontal, AlertCircle, BookOpen,
    StickyNote,  Clock, Plus, ChevronRight, Check,
    Flag, Paperclip,  CheckSquare
} from 'lucide-react';

// ✅ FIX 1: Changed path to './types' (plural) to match your folder structure
// ✅ FIX 2: Used 'import type' to satisfy strict TypeScript rules
import type { Mentor } from './type';
import { StatusBadge, Avatar } from './UIHelpers';

// ================= TYPES & INTERFACES =================

interface ChecklistItem {
    id: number;
    text: string;
    done: boolean;
}

interface Task {
    id: number;
    title: string;
    due: string;
    status: "Pending" | "In Progress" | "Completed";
    priority?: "High" | "Medium" | "Low";
    description: string;
    checklist: ChecklistItem[];
    attachments: number;
    completedDate: string | null;
    type: "assignment" | "quiz" | "project"; 
    estTime?: string; // Added for the new design
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

interface TaskDetailViewProps {
    task: Task;
    onBack: () => void;
}

// ================= MAIN COMPONENT =================

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onBack }) => {
    // Defaulting to 'tasks' so you can see the new design immediately
    const [activeTab, setActiveTab] = useState<string>('tasks');

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

                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider hidden sm:block">
                            Mentor View
                        </span>
                        <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
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
                        <TabButton label="Tasks & Projects" isActive={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-md text-xs text-amber-700 mb-2">
                        <StickyNote className="w-3.5 h-3.5" />
                        <span className="font-medium">Note:</span> Follow-up on React Assignment by Friday.
                    </div>
                </div>

                {/* ================= CONTENT AREA ================= */}
                <div className="min-h-[400px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'overview' && <OverviewTab />}
                    {activeTab === 'profile' && <ProfileTab student={student} />}
                    {activeTab === 'tasks' && <TasksTab />}
                </div>
            </div>
        </div>
    );
};

// ================= SUB-COMPONENTS =================

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

            {/* Bottom Section: Classes & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Classes */}
                <div className="lg:col-span-2 bg-white p-6 rounded-md shadow-xs">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Today's Classes</h3>
                        <p className="text-slate-500 text-sm">Schedule for Thursday, May 16</p>
                    </div>

                    <div className="space-y-4">
                        {/* Class Item 1 */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-purple-50 rounded-md border-l-[6px] border-purple-500">
                            <div className="mb-3 sm:mb-0">
                                <h4 className="text-purple-700 font-bold text-sm">CS 102</h4>
                                <h3 className="text-slate-900 font-bold text-lg!">Circuit Theory</h3>
                                <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                    <span className="flex items-center gap-1">Room SF 13</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-slate-900 font-bold text-lg">8:00 AM</span>
                                <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-md">
                                    Absent
                                </span>
                            </div>
                        </div>

                        {/* Class Item 2 */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-lime-50 rounded-xl border-l-[6px] border-lime-500">
                            <div className="mb-3 sm:mb-0">
                                <h4 className="text-lime-800 font-bold text-sm">MAT 104</h4>
                                <h3 className="text-slate-900 font-bold text-lg!">Discrete Math</h3>
                                <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                    <span className="flex items-center gap-1">Room FF 10</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-slate-900 font-bold text-lg">10:30 AM</span>
                                <span className="bg-white/80 text-green-700 text-xs font-bold px-3 py-1 rounded-md border border-green-200">
                                    Attended
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#1e293b] p-6 rounded-md shadow-xs text-white">
                    <h3 className="text-xl font-bold mb-8">Recent Activity</h3>
                    
                    <div className="relative border-l border-slate-600 ml-3 space-y-10 pl-8 pb-4">
                        {/* Activity Item 1 */}
                        <div className="relative">
                            <div className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-2 border-[#6366f1] bg-[#1e293b] z-10"></div>
                            <div>
                                <h4 className="font-semibold text-white text-base">Checked in for Discrete Math</h4>
                                <p className="text-slate-400 text-sm mt-1">Today, 10:30 AM</p>
                            </div>
                        </div>

                        {/* Activity Item 2 */}
                        <div className="relative">
                            <div className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-2 border-[#10b981] bg-[#1e293b] z-10"></div>
                            <div>
                                <h4 className="font-semibold text-white text-base">Completed Biometric Registration</h4>
                                <p className="text-slate-400 text-sm mt-1">Today, 10:00 AM</p>
                            </div>
                        </div>
                    </div>
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

// ================= TASKS TAB =================

const TasksTab = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    // Updated data to match the image content
    const assignedTasks: Task[] = [
        {
            id: 1,
            title: "React Components Deep Dive",
            due: "Tomorrow, 5:00 PM",
            status: "Pending",
            priority: "High",
            description: "Study the React component lifecycle methods and functional components. Implement a dashboard widget using the 'Compound Component' pattern. Focus on prop drilling vs context API usage.",
            checklist: [
                { id: 1, text: "Read Documentation on Hooks", done: true },
                { id: 2, text: "Create Button Component", done: false },
                { id: 3, text: "Implement Context API", done: false },
            ],
            attachments: 2,
            completedDate: null,
            type: "assignment",
            estTime: "4 Hours"
        },
        {
            id: 2,
            title: "UI/UX Final Submission",
            due: "In 3 days",
            status: "In Progress",
            priority: "Medium",
            description: "Final submission of the Figma prototype.",
            checklist: [],
            attachments: 0,
            completedDate: null,
            type: "project",
            estTime: "2 Hours"
        }
    ];

    const completedTasks: Task[] = [
        {
            id: 3,
            title: "Javascript Basics Quiz",
            due: "",
            status: "Completed",
            description: "Quiz covering ES6+ features.",
            checklist: [],
            attachments: 0,
            completedDate: "Last week",
            type: "quiz"
        },
        {
            id: 4,
            title: "Project Setup & Environment",
            due: "",
            status: "Completed",
            description: "Setting up Node, NPM and Git.",
            checklist: [],
            attachments: 0,
            completedDate: "2 weeks ago",
            type: "assignment"
        }
    ];

    if (selectedTask) {
        return <TaskDetailView task={selectedTask} onBack={() => setSelectedTask(null)} />;
    }

    return (
        <section className='space-y-8 animate-in fade-in slide-in-from-right-4 duration-300'>
            
            {/* ASSIGNED TASKS SECTION */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">Assigned Tasks</h3>
                        <p className="text-slate-500 text-sm mt-1">Active assignments and deadlines.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-indigo-200">
                        <Plus className="w-4 h-4" />
                        Assign Task
                    </button>
                </div>

                <div className="bg-white rounded-md shadow-xs overflow-hidden divide-y divide-slate-100">
                    {assignedTasks.map((task) => (
                        <div 
                            key={task.id} 
                            onClick={() => setSelectedTask(task)}
                            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-0.5 p-2.5 rounded-full ${task.status === 'In Progress' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                                    {task.status === 'In Progress' ? <Clock className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-base mb-1.5">{task.title}</h4>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium bg-slate-100 px-2.5 py-1 rounded-md">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {task.due}
                                        </div>
                                        {task.priority === 'High' && (
                                            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-1 rounded uppercase tracking-wide">
                                                High Priority
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-14 sm:pl-0">
                                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${
                                    task.status === 'In Progress' 
                                        ? 'bg-amber-50 text-amber-700 border-amber-100' 
                                        : 'bg-slate-100 text-slate-600 border-slate-200'
                                }`}>
                                    {task.status}
                                </span>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* COMPLETED TASKS SECTION */}
            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900">Completed Tasks</h3>
                    <p className="text-slate-500 text-sm mt-1">Past assignments history.</p>
                </div>

                <div className="bg-white rounded-md shadow-xs overflow-hidden divide-y divide-slate-100">
                    {completedTasks.map((task) => (
                        <div 
                            key={task.id} 
                            onClick={() => setSelectedTask(task)}
                            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 p-2.5 rounded-full bg-emerald-100 text-emerald-600">
                                    <Check className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-700 text-base mb-1.5 group-hover:text-slate-900">{task.title}</h4>
                                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {task.completedDate}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-14 sm:pl-0">
                                <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    Completed
                                </span>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

// ================= NEW TASK DETAILS VIEW =================

const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, onBack }) => {
    // Calculate progress
    const completedSubtasks = task.checklist.filter(i => i.done).length;
    const totalSubtasks = task.checklist.length;
    const progressPercent = totalSubtasks === 0 ? 0 : (completedSubtasks / totalSubtasks) * 100;

    return (
        <div className="animate-in fade-in zoom-in-95 duration-200">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-4 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Task List
            </button>

            <div className="flex flex-col xl:flex-row gap-6">
                {/* LEFT COLUMN: Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white rounded-md shadow-xs p-6 sm:p-8">
                        {/* Header Tags */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                                {task.status}
                            </span>
                            {task.priority === 'High' && (
                                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-700 border border-rose-100">
                                    High Priority
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">{task.title}</h3>

                        {/* Description */}
                        <div className="mb-8">
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Description</h4>
                            <p className="text-slate-600 text-sm leading-7">
                                {task.description}
                            </p>
                        </div>

                        {/* Subtasks Section */}
                        {task.checklist.length > 0 && (
                            <div className="pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide">
                                        <CheckSquare className="w-4 h-4 text-indigo-600" />
                                        Subtasks
                                    </h3>
                                    <span className="text-xs font-medium text-slate-500">
                                        {completedSubtasks}/{totalSubtasks} Completed
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                                    <div 
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                </div>

                                {/* Checklist Items */}
                                <div className="space-y-3">
                                    {task.checklist.map((item) => (
                                        <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-100 hover:bg-slate-50 transition-colors group">
                                            <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                                                item.done ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-300 group-hover:border-indigo-300'
                                            }`}>
                                                {item.done && <Check className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <span className={`text-sm ${item.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                                                {item.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Sidebar */}
                <div className="w-full xl:w-80 space-y-6">
                    {/* Task Details Card */}
                    <div className="bg-white rounded-md shadow-xs p-6">
                        <h3 className="text-lg! font-bold text-slate-900 mb-6 uppercase tracking-wide">Task Details</h3>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium mb-0.5">Due Date</p>
                                    <p className="text-sm font-bold text-slate-900">{task.due}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                                    <Flag className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium mb-0.5">Priority Level</p>
                                    <p className="text-sm font-bold text-slate-900">{task.priority || "Normal"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium mb-0.5">Est. Time</p>
                                    <p className="text-sm font-bold text-slate-900">{task.estTime || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attachments Card */}
                    <div className="bg-white rounded-md shadow-xs p-6">
                        <h3 className="text-lg! font-bold text-slate-900 mb-4 uppercase tracking-wide">Attachments ({task.attachments})</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer bg-slate-50/50">
                                <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-slate-400">
                                    <Paperclip className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-700 truncate">Project_Guidelines.pdf</p>
                                    <p className="text-xs text-slate-400">2.4 MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

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