import React, { useState } from 'react';
import {
    ArrowLeft, Mail, Phone, Calendar, MapPin,
    MoreHorizontal, CheckCircle2, Clock,
    AlertCircle, Download, FolderOpen, BookOpen,
    StickyNote, Heart, MessageCircle, Share,
    ChevronRight, Paperclip, AlignLeft, CheckSquare,
     Send, 
} from 'lucide-react';

// ================= TYPES & INTERFACES =================

interface Student {
    name: string;
    id: string;
    course: string;
    status: string;
    progress: string;
    bio: string;
    email: string;
    phone: string;
    date: string;
}

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
    priority: string;
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
    student?: Student;
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

interface AvatarProps {
    name: string;
    size?: 'sm' | 'xl';
}

interface StatusBadgeProps {
    status: string;
}

interface TaskDetailViewProps {
    task: Task;
    onBack: () => void;
}

// ================= MAIN COMPONENT =================

const StudentDetail: React.FC<StudentDetailProps> = ({ 
    student = { 
        name: "Kelvin Yeboah", 
        id: "123", 
        course: "B.Tech CS", 
        status: "Active", 
        progress: "75%", 
        bio: "Aspiring Full Stack Developer", 
        email: "kelvin@example.com", 
        phone: "+91 98765 43210", 
        date: "Sep 2023" 
    }, 
    onBack 
}) => {
    // Explicitly typing state as a string literal union or generic string
    const [activeTab, setActiveTab] = useState<string>('tasks'); 

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 animate-in fade-in zoom-in duration-300">
            <div className="space-y-6">

                {/* ================= TOP NAVIGATION ================= */}
                <nav className="flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md"
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
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                    <div className="flex flex-col md:flex-row gap-6 relative z-10">
                        <div className="flex-shrink-0">
                            <Avatar name={student.name} size="xl" />
                        </div>

                        <div className="flex-grow space-y-4">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                <div>
                                    <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{student.name}</h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-slate-500">
                                        <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md text-slate-700 font-medium">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            {student.course}
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
                                        <span className="text-slate-900">{student.progress}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: student.progress }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= TAB NAVIGATION BAR ================= */}
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

// 1. Overview Tab
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

                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Today's Classes</h3>
                            <p className="text-xs text-slate-500 mt-1">Schedule for Thursday, May 16</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-purple-100/50 p-4 rounded-xl border-l-4 border-purple-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <p className="text-xs font-bold text-purple-600 mb-1">CS 102</p>
                                <h4 className="font-bold text-slate-800">Circuit Theory</h4>
                                <p className="text-xs text-slate-500 font-medium">Room SF 13</p>
                            </div>
                            <div className="text-right flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                                <span className="font-bold text-slate-700 block">8:00 AM</span>
                                <span className="text-xs font-bold text-rose-500 bg-rose-100 px-2 py-0.5 rounded ml-2 sm:ml-0 sm:mt-1">Absent</span>
                            </div>
                        </div>
                        <div className="bg-[#DAF7A6] p-4 rounded-xl border-l-4 border-lime-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                            <div>
                                <p className="text-xs font-bold text-lime-800 mb-1">MAT 104</p>
                                <h4 className="font-bold text-slate-900">Discrete Math</h4>
                                <p className="text-xs text-slate-700 font-medium">Room FF 10</p>
                            </div>
                            <div className="text-right flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                                <span className="font-bold text-slate-900 block">10:30 AM</span>
                                <span className="text-xs font-bold text-emerald-700 bg-white/50 px-2 py-0.5 rounded ml-2 sm:ml-0 sm:mt-1">Attended</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-[#1e293b] text-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-lg mb-6 border-b border-slate-700 pb-4">Recent Activity</h3>
                    <div className="space-y-6 relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-700 rounded-full"></div>
                        <div className="flex gap-4 relative">
                            <div className="w-4 h-4 rounded-full bg-[#1e293b] border-2 border-indigo-400 z-10 mt-1"></div>
                            <div>
                                <p className="text-sm font-medium text-slate-200">Checked in for Discrete Math</p>
                                <p className="text-xs text-slate-500 mt-1">Today, 10:30 AM</p>
                            </div>
                        </div>
                        <div className="flex gap-4 relative">
                            <div className="w-4 h-4 rounded-full bg-[#1e293b] border-2 border-emerald-400 z-10 mt-1"></div>
                            <div>
                                <p className="text-sm font-medium text-slate-200">Completed Biometric Registration</p>
                                <p className="text-xs text-slate-500 mt-1">Today, 10:00 AM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. Horizontal Tab Button
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

// 3. Profile Content
const ProfileTab: React.FC<{ student: Student }> = ({ student }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">About Student</h3>
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
                    <InfoCard icon={MapPin} label="Location" value="New Delhi, India" />
                </div>
            </div>
        </div>
        <div className="space-y-6">
            <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-md relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-1">Mentorship Session</h3>
                    <p className="text-indigo-200 text-sm mb-4">Next scheduled session</p>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <Calendar className="w-5 h-5 text-indigo-300" />
                        <div>
                            <p className="font-semibold text-sm">Thursday, 24 Oct</p>
                            <p className="text-xs text-indigo-300">4:00 PM - 5:00 PM</p>
                        </div>
                    </div>
                    <button className="mt-4 w-full py-2 bg-white text-indigo-900 rounded-lg text-sm font-bold hover:bg-indigo-50 transition">
                        Reschedule
                    </button>
                </div>
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-700 rounded-full blur-2xl opacity-50 pointer-events-none" />
            </div>
        </div>
    </div>
);

// 4. Activity Tab
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
        {
            id: 2,
            author: studentName,
            authorAvatar: null,
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            content: "Does anyone have resources for optimizing Next.js images? Im struggling with LCP scores.",
            likes: 5,
            liked: true,
            comments: [1, 2, 3, 4],
            shares: 0,
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60"
        }
    ]);

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
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
                                {post.image && (
                                    <div className="rounded-lg overflow-hidden border border-slate-200 mt-3">
                                        <img src={post.image} alt="Post content" className="w-full max-h-80 object-cover hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between pl-12 sm:pl-14">
                                <div className="flex items-center space-x-6">
                                    <button onClick={() => handleLike(post.id)} className={`flex items-center space-x-2 text-sm transition-colors ${post.liked ? "text-rose-600" : "text-slate-500 hover:text-rose-600"}`}>
                                        <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                                        <span>{post.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>{post.comments.length}</span>
                                    </button>
                                    <button className="flex items-center space-x-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                                        <Share className="w-4 h-4" />
                                        <span>{post.shares}</span>
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

// 5. Tasks Tab (Modified for Detail View)
const TasksTab = () => {
    // State to toggle between List View and Detail View
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const allTasks: Task[] = [
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
                { id: 3, text: "Implement Context API", done: false }
            ],
            attachments: 2,
            completedDate: null
        },
        {
            id: 2,
            title: "UI/UX Final Submission",
            due: "In 3 days",
            status: "In Progress",
            priority: "Medium",
            description: "Finalize the color palette and typography for the main project. Ensure accessibility standards (WCAG) are met for all form inputs. Export assets in SVG format.",
            checklist: [
                { id: 1, text: "Color Contrast Check", done: true },
                { id: 2, text: "Mobile Responsiveness", done: true },
                { id: 3, text: "Final Export", done: false }
            ],
            attachments: 4,
            completedDate: null
        },
        {
            id: 3,
            title: "Javascript Basics Quiz",
            due: "Last week",
            status: "Completed",
            priority: "Low",
            description: "Complete the 20-question quiz on ES6+ features including arrow functions, destructuring, and spread operators.",
            checklist: [],
            attachments: 0,
            completedDate: "Oct 24, 2023 at 10:00 AM" // Added completed date
        },
        {
            id: 4,
            title: "Project Setup & Environment",
            due: "2 weeks ago",
            status: "Completed",
            priority: "High",
            description: "Initialize the Git repository and set up the Next.js environment with Tailwind CSS.",
            checklist: [
                { id: 1, text: "Install Node.js", done: true },
                { id: 2, text: "Config Tailwind", done: true }
            ],
            attachments: 1,
            completedDate: "Oct 10, 2023 at 2:30 PM" // Added completed date
        },
    ];

    const activeTasks = allTasks.filter(t => t.status !== "Completed");
    const completedTasks = allTasks.filter(t => t.status === "Completed");

    // If a task is selected, show the Detail Component
    if (selectedTask) {
        return <TaskDetailView task={selectedTask} onBack={() => setSelectedTask(null)} />;
    }

    // Otherwise, show the Task List
    return (
        <section className='space-y-6 animate-in fade-in slide-in-from-right-4 duration-300'>
            {/* Active Tasks Section */}
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Assigned Tasks</h3>
                        <p className="text-slate-500 text-sm">Active assignments and deadlines.</p>
                    </div>
                    <button className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition shadow-sm shadow-indigo-100">
                        + Assign Task
                    </button>
                </div>

                <div className="divide-y divide-slate-100">
                    {activeTasks.length > 0 ? activeTasks.map((task) => (
                        <div
                            key={task.id}
                            onClick={() => setSelectedTask(task)} // Click Handler
                            className="group p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition cursor-pointer gap-4"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 p-2 rounded-full ${task.status === "In Progress" ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-500"}`}>
                                    {task.status === "In Progress" ? <Clock className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">{task.title}</p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-100 px-2 py-0.5 rounded">
                                            <Calendar className="w-3 h-3" /> {task.due}
                                        </span>
                                        {task.priority === "High" && (
                                            <span className="text-[10px] font-bold uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">High Priority</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 pl-14 sm:pl-0">
                                <span className={`text-xs font-medium px-3 py-1 rounded-full border ${task.status === "In Progress" ? "bg-amber-50 text-amber-700 border-amber-100" : "bg-slate-50 text-slate-600 border-slate-200"}`}>
                                    {task.status}
                                </span>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-slate-500 text-sm">No active tasks found.</div>
                    )}
                </div>
            </div>

            {/* Completed Tasks Section */}
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden opacity-90">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800">Completed Tasks</h3>
                    <p className="text-slate-500 text-sm">Past assignments history.</p>
                </div>

                <div className="divide-y divide-slate-100">
                    {completedTasks.length > 0 ? completedTasks.map((task) => (
                        <div
                            key={task.id}
                            onClick={() => setSelectedTask(task)} // Click Handler
                            className="group p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition cursor-pointer gap-4"
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 p-2 rounded-full bg-emerald-100 text-emerald-600">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-600 line-through decoration-slate-400 decoration-1">{task.title}</p>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <span className="text-xs text-slate-400 flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" /> {task.due}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 pl-14 sm:pl-0">
                                <span className="text-xs font-medium px-3 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-100">
                                    Completed
                                </span>
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-all" />
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-slate-500 text-sm">No completed tasks yet.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

// 5.1 New Task Detail Component
const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, onBack }) => {
    return (
        <div className="animate-in fade-in zoom-in-95 duration-200">
            {/* Header / Nav */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 mb-4 transition-colors group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Task List
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6 sm:p-8">
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${task.priority === 'High' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                        {task.priority} Priority
                                    </span>
                                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${task.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                        {task.status}
                                    </span>
                                </div>
                                <h1 className="text-2xl font-bold text-slate-900">{task.title}</h1>
                            </div>
                            {task.status !== 'Completed' && (
                                <button className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
                                    Mark Complete
                                </button>
                            )}
                        </div>

                        <div className="prose prose-slate prose-sm max-w-none">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                                <AlignLeft className="w-4 h-4" /> Description
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {task.description}
                            </p>
                        </div>

                        <div className="border-t border-slate-100 pt-6">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                                <CheckSquare className="w-4 h-4" /> Subtasks
                            </h3>
                            <div className="space-y-3">
                                {task.checklist && task.checklist.length > 0 ? (
                                    task.checklist.map((item) => (
                                        <label key={item.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition">
                                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${item.done ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white'}`}>
                                                {item.done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                                            </div>
                                            <span className={`text-sm ${item.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                                                {item.text}
                                            </span>
                                        </label>
                                    ))
                                ) : (
                                    <p className="text-sm text-slate-400 italic">No subtasks defined.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Discussion & Grading Area */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">

                        {/* ================= Header ================= */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900">
                                    Discussion & Grading
                                </h3>
                            </div>

                            {/* Grade Selector */}
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                    Grade
                                </span>
                                <select
                                    className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg px-3 py-2
                                   focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                                >
                                    <option>Select grade</option>
                                    <option>A+ (Excellent)</option>
                                    <option>A (Very Good)</option>
                                    <option>B (Good)</option>
                                    <option>C (Average)</option>
                                    <option>F (Fail)</option>
                                </select>
                            </div>
                        </div>

                        {/* ================= Comment Box ================= */}
                        <div className="flex gap-4">

                            {/* Avatar */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700
                              text-white flex items-center justify-center font-semibold text-sm shadow">
                                M
                            </div>

                            {/* Input Area */}
                            <div className="flex-1 relative">
                                <textarea
                                    placeholder="Write feedback or comments for the student..."
                                    className="w-full min-h-[100px] resize-y rounded-xl border border-slate-200
                                       bg-slate-50 px-4 py-3 text-sm text-slate-700
                                       focus:outline-none focus:ring-2 focus:ring-indigo-500/30
                                       focus:border-indigo-500 transition"
                                />

                                {/* Actions */}
                                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="p-2 rounded-lg text-slate-400 hover:text-indigo-600
                                         hover:bg-indigo-50 transition"
                                        aria-label="Attach file"
                                    >
                                        <Paperclip className="w-4 h-4" />
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-1.5
                                         bg-indigo-600 text-white text-xs font-semibold
                                         px-4 py-2 rounded-lg
                                         hover:bg-indigo-700 transition shadow-sm"
                                    >
                                        Post
                                        <Send className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Task Details</h3>

                        <div className="space-y-4">
                            {/* Due Date */}
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Due Date</p>
                                    <p className="text-sm font-bold text-slate-800">{task.due}</p>
                                </div>
                            </div>

                            {/* --- NEW: Completed Time (Conditional) --- */}
                            {task.status === 'Completed' && (
                                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2">
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium">Completed On</p>
                                        <p className="text-sm font-bold text-slate-800">
                                            {task.completedDate || "N/A"}</p>
                                    </div>
                                </div>
                            )}
                            {/* ----------------------------------------- */}

                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <FolderOpen className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Project</p>
                                    <p className="text-sm font-bold text-slate-800">Frontend Dev</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Download className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Submitted At</p>
                                    <p className="text-sm font-bold text-slate-800">26/12/2025</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-5">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Attachments ({task.attachments})</h3>
                        {task.attachments > 0 ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition cursor-pointer group">
                                    <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                                        <Paperclip className="w-4 h-4" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-medium text-slate-700 truncate group-hover:text-indigo-600 transition-colors">Design_Specs_v2.pdf</p>
                                        <p className="text-[10px] text-slate-400">2.4 MB</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition cursor-pointer group">
                                    <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                                        <Paperclip className="w-4 h-4" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-medium text-slate-700 truncate group-hover:text-indigo-600 transition-colors">Reference_Assets.zip</p>
                                        <p className="text-[10px] text-slate-400">14 MB</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 italic">No files attached.</p>
                        )}
                        <button className="w-full mt-4 py-2 border border-dashed border-slate-300 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:border-slate-400 transition">
                            + Add Attachment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 6. Documents Content
const DocumentsTab = () => (
    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm min-h-[400px] flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-indigo-50 p-4 rounded-full mb-4">
            <FolderOpen className="w-8 h-8 text-indigo-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No Documents Uploaded</h3>
        <p className="text-slate-500 text-sm max-w-xs mx-auto mt-2">
            There are no certificates, assignments, or resumes uploaded for this student yet.
        </p>
        <button className="mt-6 flex items-center gap-2 text-sm bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition">
            <Download className="w-4 h-4" />
            Upload New File
        </button>
    </div>
);

// ================= UI HELPERS =================

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
        <div className="bg-white p-2 rounded-md border border-slate-100 text-slate-400">
            <Icon className="w-4 h-4" />
        </div>
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</p>
            <p className="text-sm font-semibold text-slate-800">{value || "N/A"}</p>
        </div>
    </div>
);

const Avatar: React.FC<AvatarProps> = ({ name, size = "sm" }) => {
    const sizeClasses = size === "xl" ? "h-20 w-20 text-3xl shadow-md border-4 border-white" : "h-10 w-10 text-sm";
    const colors = ["bg-indigo-100 text-indigo-700", "bg-rose-100 text-rose-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700"];
    const colorIndex = name ? name.length % colors.length : 0;
    const colorClass = colors[colorIndex];

    return (
        <div className={`${sizeClasses} rounded-full ${colorClass} flex items-center justify-center font-bold flex-shrink-0`}>
            {name ? name.charAt(0) : "U"}
        </div>
    );
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const isActive = status === "Active";
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${isActive
            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
            : "bg-rose-50 text-rose-700 border-rose-100"
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
            {status}
        </span>
    );
};

export default StudentDetail;