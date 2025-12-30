// src/components/StudentDetail/index.tsx
import React, { useState } from 'react';
import { ArrowLeft, MoreHorizontal, StickyNote } from 'lucide-react';

// Imports
import type { StudentDetailProps } from './types';
import { Avatar, StatusBadge, TabButton } from './UIComponents';

// Tabs
import { OverviewTab } from './tabs/OverviewTab';
import { ProfileTab } from './tabs/ProfileTab';
import { TasksTab } from './tabs/TasksTab'; // This was the old simple list
import { ActivityTab } from './tabs/ActivityTab';
import { DocumentsTab } from './tabs/DocumentsTab';
import { StudentTasksTab } from './tabs/Tasks'; // <--- 1. Import the new component

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
  // Explicitly typing state
  const [activeTab, setActiveTab] = useState<string>('overview'); // Defaulted to 'Task' as per your example

  return (
    <div className="min-h-screen bg-slate-50/50 animate-in fade-in zoom-in duration-300">
      <div className="space-y-6">

        {/* ================= TOP NAVIGATION ================= */}
        <nav className="flex items-center justify-between">
          <button onClick={onBack} className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm hover:shadow-md">
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
              <Avatar name={student.name} size="xl" />
              <div className="flex-grow space-y-4">
                 <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{student.name}</h3>
                 <StatusBadge status={student.status} />
                 
                 {/* Progress Bar Area */}
                 <div className="w-full max-w-md">
                    <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-slate-500">Overall Progress</span>
                        <span className="text-slate-900">{student.progress}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: student.progress }}></div>
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
            {/* 2. Added your new tab button here */}
            <TabButton label="Student Tasks" isActive={activeTab === 'Task'} onClick={() => setActiveTab('Task')} />
            <TabButton label="Projects" isActive={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
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
          
          {/* 3. Render the new component when tab is active */}
          {activeTab === 'Task' && <StudentTasksTab />}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;