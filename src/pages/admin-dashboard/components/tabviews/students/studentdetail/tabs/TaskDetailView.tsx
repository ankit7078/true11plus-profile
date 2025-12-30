import React from 'react';
import { 
    ArrowLeft, Calendar, Flag, Paperclip, 
    CheckSquare, Square, Clock, MoreVertical 
} from 'lucide-react';

// ✅ Make sure this path points to where you actually saved UIHelpers
import { StatusBadge } from '../UIComponents'; 

// ================= TYPES =================

interface ChecklistItem {
    id: number;
    text: string;
    done: boolean;
}

export interface Task {
    id: number | string;
    title: string;
    due: string;
    status: string;
    priority: "High" | "Medium" | "Low";
    description: string;
    checklist: ChecklistItem[];
    attachments: number;
    completedDate: string | null;
}

interface TaskDetailViewProps {
    task: Task;
    onBack: () => void;
}

// ================= HELPER FUNCTIONS =================

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'High': return 'text-red-600 bg-red-50 border-red-100';
        case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
        default: return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    }
};

// ================= MAIN COMPONENT =================

export const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, onBack }) => {
    
    // Calculate checklist progress logic
    const completedSteps = task.checklist ? task.checklist.filter(item => item.done).length : 0;
    const totalSteps = task.checklist ? task.checklist.length : 0;
    const progress = totalSteps === 0 ? 0 : Math.round((completedSteps / totalSteps) * 100);

    return (
        <div className="animate-in fade-in zoom-in-95 duration-200 h-full flex flex-col">
            
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Task List
                </button>
                
                <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Description & Checklist */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6 sm:p-8">
                        
                        {/* Title & Status Header */}
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <StatusBadge status={task.status} />
                                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded border ${getPriorityColor(task.priority)}`}>
                                        {task.priority} Priority
                                    </span>
                                </div>
                                <h4 className="text-2xl font-bold text-slate-900 leading-tight">{task.title}</h4>
                            </div>
                        </div>

                        {/* Description Body */}
                        <div className="prose prose-slate prose-sm max-w-none border-b border-slate-100 pb-6 mb-6">
                            <h3 className="text-lg! font-bold text-slate-900 uppercase tracking-wide mb-2">Description</h3>
                            <p className="text-slate-600 leading-relaxed">{task.description}</p>
                        </div>

                        {/* Checklist Section */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg! font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                                    <CheckSquare className="w-4 h-4 text-slate-400" />
                                    Subtasks
                                </h3>
                                <span className="text-xs font-medium text-slate-500">
                                    {completedSteps}/{totalSteps} Completed
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                                <div 
                                    className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }} 
                                />
                            </div>

                            {/* Checklist Items */}
                            <div className="space-y-3">
                                {task.checklist && task.checklist.map((item) => (
                                    <div key={item.id} className="group flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all cursor-pointer">
                                        <div className={`mt-0.5 ${item.done ? 'text-indigo-600' : 'text-slate-300 group-hover:text-indigo-400'}`}>
                                            {item.done ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                                        </div>
                                        <span className={`text-sm ${item.done ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Meta Details (Sidebar) */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
                        <h3 className="text-lg! font-bold text-slate-900 uppercase tracking-wide mb-4">Task Details</h3>
                        
                        <div className="space-y-4">
                            {/* Due Date */}
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-medium">Due Date</p>
                                    <p className="text-slate-900 font-semibold">{task.due}</p>
                                </div>
                            </div>

                            {/* Priority */}
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                                    <Flag className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-medium">Priority Level</p>
                                    <p className="text-slate-900 font-semibold">{task.priority}</p>
                                </div>
                            </div>

                            {/* Time Estimate (Hardcoded for demo, or add to Interface) */}
                            <div className="flex items-center gap-3 text-sm">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-slate-500 text-xs font-medium">Est. Time</p>
                                    <p className="text-slate-900 font-semibold">4 Hours</p>
                                </div>
                            </div>
                        </div>

                        {/* Attachments Section */}
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <h3 className="text-lg! font-bold text-slate-900 uppercase tracking-wide mb-4">Attachments ({task.attachments})</h3>
                            {task.attachments > 0 ? (
                                <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:border-indigo-300 transition-colors cursor-pointer bg-slate-50/50">
                                    <div className="bg-white p-2 rounded border border-slate-100">
                                        <Paperclip className="w-4 h-4 text-slate-400" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-medium text-slate-700 truncate">Project_Guidelines.pdf</p>
                                        <p className="text-xs text-slate-400">2.4 MB</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-400 italic">No attachments added.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};