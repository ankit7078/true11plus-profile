import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Calendar,
  Share2,
  Image as ImageIcon,
  Plus,
  X,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";

// --- 1. Types & Interfaces ---

type TaskPriority = "High" | "Moderate" | "Low";
type TaskStatus = "Not Started" | "In Progress" | "Completed";

interface Task {
  id: number;
  title: string;
  desc: string;
  date: string;
  createdOn: string;
  image: string;
  priority: TaskPriority | string;
  status: TaskStatus | string;
}

interface CompletedItem {
  id: number;
  originalId: number;
  title: string;
  desc: string;
  completedTime: string;
  image: string;
  shareLink: string;
}

interface TaskFormData {
  title: string;
  desc: string;
  date: string;
  priority: TaskPriority;
  image: string;
}

// --- 2. Helper Functions & Mock Data ---

const nowRelative = (): string => {
  return new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const formatDate = (iso: string): string => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  alert("Link copied to clipboard!");
};

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Attend Nischal's Birthday Party",
    desc: "Buy gifts on the way and pick up cake from the bakery.",
    date: "2023-06-20",
    createdOn: "2023-06-15",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    priority: "Moderate",
    status: "Not Started",
  },
  {
    id: 2,
    title: "Landing Page Design",
    desc: "Deliver the final landing page and review the hero section.",
    date: "2023-06-20",
    createdOn: "2023-06-18",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400",
    priority: "High",
    status: "In Progress",
  },
];

const sampleCompleted: CompletedItem[] = [
  {
    id: 100,
    originalId: 99,
    title: "Walk the dog",
    desc: "Take the dog to the park.",
    completedTime: "Yesterday, 4:00 PM",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400",
    shareLink: "https://example.com/task/99",
  },
];

// --- 3. Sub-Components ---

// -- Circular Progress --
interface CircularProgressProps {
  percentage?: number;
  label?: string;
  accent?: "green" | "blue" | "red";
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage = 0,
  label = "",
  accent = "green",
}) => {
  const size = 60;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    green: { start: "#34d399", end: "#059669" },
    blue: { start: "#60a5fa", end: "#3b82f6" },
    red: { start: "#fca5a5", end: "#ef4444" },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            stroke="#f3f4f6"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            stroke={`url(#grad-${accent})`}
            fill="none"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
          <defs>
            <linearGradient id={`grad-${accent}`} x1="0%" x2="100%">
              <stop offset="0%" stopColor={colors[accent].start} />
              <stop offset="100%" stopColor={colors[accent].end} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">
          {Math.round(percentage)}%
        </div>
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-wide font-medium text-gray-500">
        {label}
      </div>
    </div>
  );
};

// -- Task Card --
interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <Link to="#" onClick={() => onEdit(task)}>
            <h4 className="font-semibold text-gray-800 text-lg group-hover:text-purple-600 transition-colors">
              {task.title}
            </h4>
          </Link>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {task.desc}
          </p>

          <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
              <Calendar className="w-3 h-3" /> {formatDate(task.date)}
            </span>
            <span
              className={`px-2 py-1 rounded ${
                task.priority === "High"
                  ? "bg-red-50 text-red-600"
                  : task.priority === "Moderate"
                  ? "bg-orange-50 text-orange-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {task.priority}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {task.image ? (
            <img
              src={task.image}
              alt="task"
              className="w-20 h-20 rounded-lg object-cover border border-gray-100"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-300">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
        <button
          onClick={() => onComplete(task.id)}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            task.status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          {task.status === "Completed" ? "Completed" : "Mark Complete"}
        </button>
        <span className="text-xs text-gray-400 font-medium">{task.status}</span>
      </div>
    </div>
  );
};

// -- Completed Card --
interface CompletedCardProps {
  item: CompletedItem;
  onCopyLink: (link: string) => void;
  onOpenLink: (link: string) => void;
}

const CompletedCard: React.FC<CompletedCardProps> = ({
  item,
  onCopyLink,
  onOpenLink,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-3 group hover:border-green-100 transition-colors">
      <div className="mt-1">
        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-gray-800 text-sm truncate pr-2">
              {item.title}
            </h4>
            <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">
              {item.desc}
            </p>
          </div>
          {item.image && (
            <img
              src={item.image}
              alt="done"
              className="w-10 h-10 rounded object-cover border border-gray-100"
            />
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] text-gray-400 font-medium">
            {item.completedTime}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onCopyLink(item.shareLink)}
              className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
              title="Copy Link"
            >
              <LinkIcon className="w-3 h-3" />
            </button>
            <button
              onClick={() => onOpenLink(item.shareLink)}
              className="p-1.5 hover:bg-gray-100 rounded text-gray-500"
              title="Open Task"
            >
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// -- Task Form --
interface TaskFormProps {
  onAddTask: (data: TaskFormData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<TaskFormData>({
    title: "",
    desc: "",
    date: "",
    priority: "Moderate",
    image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    onAddTask(formData);
    setFormData({
      title: "",
      desc: "",
      date: "",
      priority: "Moderate",
      image: "",
    });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mb-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-medium hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add New Task
      </button>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm mb-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-800">New Task Details</h4>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          rows={2}
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <select
            className="w-full p-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            value={formData.priority}
            onChange={(e) =>
              setFormData({
                ...formData,
                priority: e.target.value as TaskPriority,
              })
            }
          >
            <option value="Low">Low Priority</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High Priority</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Image URL (Optional)"
          className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

// --- 4. Main Component ---

export default function TaskDashboard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [completed, setCompleted] = useState<CompletedItem[]>(sampleCompleted);

  // Logic: Add a new task
  const handleAddTask = (formData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now(),
      title: formData.title.trim(),
      desc: formData.desc.trim() || "No description",
      date: formData.date || new Date().toISOString(),
      createdOn: new Date().toISOString(),
      image: formData.image || "",
      priority: formData.priority,
      status: "Not Started",
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Logic: Complete/Uncomplete a task
  const completeTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (t.status !== "Completed") {
            // Mark as done
            const shareLink = `${window.location.origin}/task/${t.id}`;
            setCompleted((c) => [
              {
                id: Date.now(),
                originalId: t.id,
                title: t.title,
                desc: t.desc,
                completedTime: nowRelative(),
                image: t.image,
                shareLink,
              },
              ...c,
            ]);
            return { ...t, status: "Completed" };
          } else {
            // Unmark (revert to Not Started) - remove from completed list
            setCompleted((c) => c.filter((item) => item.originalId !== t.id));
            return { ...t, status: "Not Started" };
          }
        }
        return t;
      })
    );
  };

  const editTask = (task: Task) => {
    // In a real app, you would open a modal with the task data
    alert(`Edit functionality for: "${task.title}" goes here.`);
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener");
  };

  // Metrics
  // const total = tasks.length + completed.length;
  // Prevent division by zero
  // const safeTotal = Math.max(1, total);
  
  // const pctCompleted = Math.round(
  //   (tasks.filter((t) => t.status === "Completed").length + completed.length) / (safeTotal + (tasks.filter((t) => t.status === "Completed").length > 0 ? 0 : 0)) * 100
  // );
  
  // Revised metrics logic to match state
  const activeTasks = tasks; 
  const completedCount = completed.length;
  const inProgressCount = activeTasks.filter(t => t.status === "In Progress").length;
  const notStartedCount = activeTasks.filter(t => t.status === "Not Started").length;
  const totalCount = activeTasks.length + completedCount; // Note: activeTasks includes 'Completed' status items in the tasks array until filtered out or if kept for history

  // Recalculate based on specific requirements
  const finalPctCompleted = Math.round((completedCount / Math.max(1, totalCount)) * 100);
  const finalPctInProgress = Math.round((inProgressCount / Math.max(1, totalCount)) * 100);
  const finalPctNotStarted = Math.round((notStartedCount / Math.max(1, totalCount)) * 100);

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <header className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Task Dashboard</h3>
          <p className="text-gray-500 mt-1">
            Track and manage your application to-dos.
          </p>
        </div>
        <button className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors">
            <Share2 className="w-5 h-5 text-gray-600" />
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form & List */}
        <section className="lg:col-span-2">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex items-center gap-2 text-purple-700 font-bold text-lg">
              <div className="p-1.5 bg-purple-100 rounded-lg">
                <CheckCircle2 size={20} />
              </div>
              My Tasks
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-800 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                Today <span className="text-gray-400 mx-1">•</span> {formatDate(new Date().toISOString())}
              </div>
            </div>
          </div>

          <TaskForm onAddTask={handleAddTask} />

          <div className="space-y-4">
            {tasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onComplete={completeTask}
                onEdit={editTask}
              />
            ))}
            {tasks.length === 0 && (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-400">No active tasks. Add one above!</p>
                </div>
            )}
          </div>
        </section>

        {/* Right Column: Widgets */}
        <aside className="lg:col-span-1 flex flex-col gap-6">
          {/* Status Widget */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h4 className="font-semibold text-lg text-gray-800 mb-6 flex items-center gap-2">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                <Clock size={18} />
              </div>
              Overview
            </h4>

            <div className="flex items-center justify-between px-2">
              <CircularProgress
                percentage={finalPctCompleted}
                label="Done"
                accent="green"
              />
              <CircularProgress
                percentage={finalPctInProgress}
                label="Active"
                accent="blue"
              />
              <CircularProgress
                percentage={finalPctNotStarted}
                label="Todo"
                accent="red"
              />
            </div>

            <div className="mt-8 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                <span className="text-gray-500">Total Workload</span>
                <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{totalCount} Tasks</span>
            </div>
          </div>

          {/* Completed List Widget */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="p-1.5 bg-green-50 text-green-600 rounded-lg">
                <CheckCircle2 size={18} />
              </div>
              Recently Completed
            </h3>

            <div className="space-y-3">
              {completed.map((c) => (
                <CompletedCard
                  key={c.id}
                  item={c}
                  onCopyLink={copyToClipboard}
                  onOpenLink={openLink}
                />
              ))}
              {completed.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-6 italic">
                  No tasks completed yet.
                </p>
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}