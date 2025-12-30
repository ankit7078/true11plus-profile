// src/components/StudentDetail/tabs/StudentTasksTab.tsx
import React, { useState } from "react";
import { 
  Calendar, CheckCircle2, Clock, Image as ImageIcon, 
  Share2, ChevronDown, Filter 
} from "lucide-react";

// --- Local Types for this Tab ---
interface Task {
  id: number;
  title: string;
  desc: string;
  date: string;
  createdOn: string;
  image: string;
  priority: string;
  status: "Not Started" | "In Progress" | "Completed";
}

interface CompletedItem {
  id: number;
  title: string;
  desc: string;
  completedTime: string;
  image: string;
}

// --- Sub-Components ---

const CircularProgress: React.FC<{ percentage?: number; label?: string; accent?: "green" | "blue" | "red" }> = ({
  percentage = 0, label = "", accent = "green",
}) => {
  const size = 64;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} stroke="#eef2f7" fill="none" />
          <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ stroke: accent === "green" ? "#34d399" : accent === "blue" ? "#60a5fa" : "#ef4444", transition: "stroke-dashoffset 600ms ease" }} fill="none" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm font-semibold text-gray-700">{Math.round(percentage)}%</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">{label}</div>
    </div>
  );
};

const TaskCard: React.FC<{ task: Task; onComplete: (id: number) => void }> = ({ task, onComplete }) => (
  <div className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 hover:shadow-md transition-all group">
    <div className="flex justify-between gap-4">
      <div>
        <h4 className="font-semibold text-gray-800 text-lg group-hover:text-indigo-600 transition-colors">{task.title}</h4>
        <p className="text-gray-500 text-sm mt-1">{task.desc}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {task.date}</span>
          <span>• Priority: <span className="font-medium text-gray-700">{task.priority}</span></span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button className="p-1.5 rounded-md hover:bg-blue-50 text-blue-500 transition-colors"><Share2 className="w-4 h-4" /></button>
        {task.image ? <img src={task.image} alt="task" className="w-16 h-12 rounded-lg object-cover" /> : 
        <div className="w-16 h-12 rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center"><ImageIcon className="w-4 h-4 text-gray-300" /></div>}
      </div>
    </div>
    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 text-xs">
      <button onClick={() => onComplete(task.id)} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all ${task.status === "Completed" ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
        <CheckCircle2 className="w-4 h-4" /> {task.status === "Completed" ? "Completed" : "Mark Done"}
      </button>
      <div className="text-gray-400">{task.status}</div>
    </div>
  </div>
);

// --- Main Tab Component ---

export const StudentTasksTab = () => {
  // State
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Final Year Project Report", desc: "Submit the initial draft of the documentation.", date: "2023-12-20", createdOn: "2023-12-01", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=200", priority: "High", status: "In Progress" },
    { id: 2, title: "React Assessment", desc: "Complete the component lifecycle quiz.", date: "2023-12-22", createdOn: "2023-12-18", image: "", priority: "Moderate", status: "Not Started" },
  ]);
  const [completed, setCompleted] = useState<CompletedItem[]>([]);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [dateRange, setDateRange] = useState("This Month");

  // Handlers
  const completeTask = (id: number) => {
    setTasks((prev) => prev.map((t) => {
      if (t.id === id && t.status !== "Completed") {
        setCompleted((c) => [{ id: Date.now(), title: t.title, desc: t.desc, completedTime: "Just now", image: t.image }, ...c]);
        return { ...t, status: "Completed" };
      }
      return t;
    }));
  };

  // Metrics
  const total = tasks.length + completed.length;
  const pctCompleted = Math.round((completed.length / Math.max(1, total)) * 100);
  const pctInProgress = Math.round((tasks.filter((t) => t.status === "In Progress").length / Math.max(1, total)) * 100);
  const pctNotStarted = Math.round((tasks.filter((t) => t.status === "Not Started").length / Math.max(1, total)) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column: Task List */}
      <div className="lg:col-span-2 space-y-6">
        {/* Filter Bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200/60 shadow-sm">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-500" /> Task List
          </h3>
          <div className="relative">
            <button onClick={() => setShowDateDropdown(!showDateDropdown)} className="flex items-center gap-2 text-xs font-medium bg-slate-50 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition">
              {dateRange} <ChevronDown className="w-3 h-3" />
            </button>
            {showDateDropdown && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 p-2 z-10">
                {["This Week", "This Month", "All Time"].map(r => (
                  <button key={r} onClick={() => { setDateRange(r); setShowDateDropdown(false); }} className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 rounded-md">{r}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} onComplete={completeTask} />
          ))}
        </div>
      </div>

      {/* Right Column: Widgets */}
      <div className="space-y-6">
        {/* Progress Widget */}
        <div className="bg-white p-6 rounded-xl border border-gray-200/60 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" /> Status Overview
          </h3>
          <div className="flex items-center justify-between gap-2">
            <CircularProgress percentage={pctCompleted} label="Done" accent="green" />
            <CircularProgress percentage={pctInProgress} label="Active" accent="blue" />
            <CircularProgress percentage={pctNotStarted} label="New" accent="red" />
          </div>
        </div>

        {/* Completed List */}
        <div className="bg-white p-6 rounded-xl border border-gray-200/60 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Completed
          </h3>
          <div className="space-y-3">
            {completed.length > 0 ? completed.map((c) => (
              <div key={c.id} className="flex gap-3 items-start p-2 hover:bg-slate-50 rounded-lg transition">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 line-clamp-1">{c.title}</p>
                  <p className="text-xs text-slate-400">{c.completedTime}</p>
                </div>
              </div>
            )) : <p className="text-xs text-slate-400 italic">No completed tasks yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};