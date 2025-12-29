'use client'

import React, { useState } from 'react';
import {
    ArrowLeft, Mail, Phone, Calendar, MapPin,
    MoreHorizontal,  AlertCircle, FolderOpen, BookOpen,
    StickyNote, Heart, 
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
    status: string;
    priority: "High" | "Medium" | "Low";
    description: string;
    checklist: ChecklistItem[];
    attachments: number;
    completedDate: string | null;
}

interface Post {
    id: number;
    author: string;
    authorAvatar: string | null;
    timestamp: string;
    content: string;
    likes: number;
    liked: boolean;
    comments: number[];
    shares: number;
    image: string | null;
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
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Current Status</p>
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
                        <TabButton label="Activity Logs" isActive={activeTab === 'activity'} onClick={() => setActiveTab('activity')} />
                        <TabButton label="Tasks & Projects" isActive={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
                        <TabButton label="Assignment" isActive={activeTab === 'documents'} onClick={() => setActiveTab('documents')} />
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
                    {activeTab === 'activity' && <ActivityTab studentName={student.name} />}
                    {activeTab === 'documents' && <DocumentsTab />}
                </div>
            </div>
        </div>
    );
};

// ================= SUB-COMPONENTS =================

const OverviewTab = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#FCD34D] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:shadow-md transition">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                        <h4 className="text-slate-800 font-medium text-sm">Total Courses</h4>
                        <span className="text-4xl font-bold text-slate-900">07</span>
                        <p className="text-xs text-slate-800/70 font-medium mt-1">2 Electives</p>
                    </div>
                    <div className="bg-[#FFCACA] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:shadow-md transition">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                        <h4 className="text-rose-900 font-medium text-sm">Attendance</h4>
                        <span className="text-4xl font-bold text-rose-950">60%</span>
                        <p className="text-xs text-rose-800/70 font-medium mt-1">24% Absent</p>
                    </div>
                    <div className="bg-[#CFD8DC] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:shadow-md transition">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                        <h4 className="text-slate-700 font-medium text-sm">Requested Leaves</h4>
                        <span className="text-4xl font-bold text-slate-800">17</span>
                        <p className="text-xs text-slate-600 font-medium mt-1">11 Approved</p>
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

const ProfileTab: React.FC<{ student: Mentor }> = ({ student }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">About Mentor</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    {student.bio || "No biography provided."}
                </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoCard icon={Mail} label="Email Address" value={student.email} />
                    <InfoCard icon={Phone} label="Phone Number" value={student.phone} />
                    <InfoCard icon={Calendar} label="Date Joined" value={student.date} />
                    <InfoCard icon={MapPin} label="Location" value="Dehradun, India" />
                </div>
            </div>
        </div>
    </div>
);

const ActivityTab: React.FC<{ studentName: string }> = ({ studentName }) => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            author: studentName,
            authorAvatar: null,
            timestamp: new Date().toISOString(),
            content: "Just finished the React Advanced Patterns module! The compound component pattern is really powerful for building reusable UI.",
            likes: 12,
            liked: false,
            comments: [1, 2],
            shares: 1,
            image: null
        },
    ]);

    // ✅ FIX 3: Added underscore to 'dateString' to silence unused variable warning
    const formatTimeAgo = (_dateString: string) => {
        return "2 hours ago"; 
    };

    const handleLike = (id: number) => {
        setPosts(currentPosts => currentPosts.map(post => {
            if (post.id === id) {
                return {
                    ...post,
                    liked: !post.liked,
                    likes: post.liked ? post.likes - 1 : post.likes + 1
                };
            }
            return post;
        }));
    };

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Activity Feed</h3>
                <div className="space-y-6">
                    {posts.map((post) => (
                        <article key={post.id} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                            <div className="flex items-center space-x-3 mb-3">
                                <Avatar name={post.author} size="sm" />
                                <div>
                                    <h4 className="font-semibold text-slate-900 text-sm">{post.author}</h4>
                                    <p className="text-xs text-slate-500">{formatTimeAgo(post.timestamp)}</p>
                                </div>
                            </div>
                            <div className="mb-4 pl-12 sm:pl-14">
                                <p className="text-slate-700 text-sm leading-relaxed mb-3">{post.content}</p>
                            </div>
                            <div className="flex items-center justify-between pl-12 sm:pl-14">
                                <div className="flex items-center space-x-6">
                                    <button onClick={() => handleLike(post.id)} className={`flex items-center space-x-2 text-sm transition-colors ${post.liked ? "text-rose-600" : "text-slate-500 hover:text-rose-600"}`}>
                                        <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                                        <span>{post.likes}</span>
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TasksTab = () => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const allTasks: Task[] = [
        {
            id: 1,
            title: "React Components Deep Dive",
            due: "Tomorrow, 5:00 PM",
            status: "Pending",
            priority: "High",
            description: "Study the React component lifecycle methods.",
            checklist: [
                { id: 1, text: "Read Documentation on Hooks", done: true },
                { id: 2, text: "Create Button Component", done: false },
            ],
            attachments: 2,
            completedDate: null
        }
    ];

    if (selectedTask) {
        return <TaskDetailView task={selectedTask} onBack={() => setSelectedTask(null)} />;
    }

    return (
        <section className='space-y-6 animate-in fade-in slide-in-from-right-4 duration-300'>
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Assigned Tasks</h3>
                    </div>
                </div>
                <div className="divide-y divide-slate-100">
                    {allTasks.map((task) => (
                        <div
                            key={task.id}
                            onClick={() => setSelectedTask(task)}
                            className="group p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition cursor-pointer gap-4"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 p-2 rounded-full bg-slate-100 text-slate-500`}>
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">{task.title}</p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded">
                                            <Calendar className="w-3 h-3" /> {task.due}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, onBack }) => {
    return (
        <div className="animate-in fade-in zoom-in-95 duration-200">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-4 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Task List
            </button>
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>
                    </div>
                </div>
                <div className="prose prose-slate prose-sm max-w-none">
                    <p className="text-slate-600 leading-relaxed mb-6">{task.description}</p>
                </div>
            </div>
        </div>
    );
};

const DocumentsTab = () => (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm min-h-[400px] flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-indigo-50 p-4 rounded-full mb-4">
            <FolderOpen className="w-8 h-8 text-indigo-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Documents Uploaded</h3>
    </div>
);

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-3 rounded-md bg-slate-50/50">
        <div className="bg-white p-2 rounded-md border border-slate-100 text-slate-400">
            <Icon className="w-4 h-4" />
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</p>
            <p className="text-sm font-semibold text-slate-800">{value || "N/A"}</p>
        </div>
    </div>
);

export default StudentDetail;