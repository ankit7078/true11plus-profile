import { AlertCircle, Calendar, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import { TaskDetailView } from "./TaskDetailView";
import { useState } from "react";

// --- Types Defined Locally ---
export interface ChecklistItem {
    id: number;
    text: string;
    done: boolean;
}

export interface Task {
    id: number;
    title: string;
    due: string;
    status: "Pending" | "In Progress" | "Completed";
    priority: "High" | "Medium" | "Low";
    description: string;
    checklist: ChecklistItem[];
    attachments: number;
    completedDate: string | null;
}
// -----------------------------

export const TasksTab = () => {
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
            completedDate: "Oct 24, 2023 at 10:00 AM"
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
            completedDate: "Oct 10, 2023 at 2:30 PM"
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