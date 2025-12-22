import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  CheckCircle2,
  Clock,
  // Edit2, // Unused import removed
  Image as ImageIcon, // Renamed to avoid conflict with HTML Image element
  Share2,
  ChevronDown,
  Filter,
} from "lucide-react";

// --- Types & Interfaces ---

type TaskStatus = "Not Started" | "In Progress" | "Completed";

interface Task {
  id: number;
  title: string;
  desc: string;
  date: string;
  createdOn: string;
  image: string;
  priority: string;
  status: TaskStatus | string; // String allowed for flexibility
}

interface CompletedItem {
  id: number;
  title: string;
  desc: string;
  completedTime: string;
  image: string;
}

interface CircularProgressProps {
  percentage?: number;
  label?: string;
  accent?: "green" | "blue" | "red";
}

// --- Helper Functions ---

const formatDate = (iso: string): string => {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch (e) {
    return iso;
  }
};

const nowRelative = (): string => {
  const d = new Date();
  return d.toLocaleString();
};

// --- Components ---

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage = 0,
  label = "",
  accent = "green",
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
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            stroke="#eef2f7"
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
            style={{
              stroke:
                accent === "green"
                  ? "url(#g-green)"
                  : accent === "blue"
                  ? "url(#g-blue)"
                  : "url(#g-red)",
              transition: "stroke-dashoffset 600ms ease",
            }}
            fill="none"
          />
          <defs>
            <linearGradient id="g-green" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="g-blue" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="g-red" x1="0%" x2="100%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm font-semibold text-gray-700">
            {Math.round(percentage)}%
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">{label}</div>
    </div>
  );
};

// ---- Task Card ----

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
  onEdit: (task: Task) => void;
  onShare: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onComplete,
  // onEdit, // Keeping props but commenting out unused variables to prevent lint errors
  onShare,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-xs hover:shadow-sm transition-shadow group">
      <div className="flex justify-between gap-4 ">
        <div className="flex gap-3 items-start ">
          <div>
            <Link to="/post-profile">
              <h4 className="font-semibold text-gray-800 text-lg group-hover:text-purple-600">
                {task.title}
              </h4>
            </Link>
            <p className="text-gray-500 max-w-md">{task.desc}</p>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {formatDate(task.date)}
              </span>
              <span>•</span>
              <span>
                Priority:{" "}
                <span className="font-medium text-gray-700">
                  {task.priority}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onShare(task)}
              className="p-1.5 rounded-md hover:bg-blue-50 text-blue-500 transition-colors"
              title="Share to Profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {/* <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded-md hover:bg-gray-50 text-gray-500 transition-colors"
              title="Edit Task"
            >
              <Edit2 className="w-4 h-4" />
            </button> */}
          </div>

          {task.image ? (
            <img
              src={task.image}
              alt="task"
              className="w-24 h-16 rounded-lg object-cover mt-1"
            />
          ) : (
            <div className="w-24 h-16 rounded-lg bg-gray-50 border border-dashed border-gray-100 flex items-center justify-center text-gray-300">
              <ImageIcon className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 text-xs">
        <div className="flex items-center gap-4 text-gray-500">
          <button
            onClick={() => onComplete(task.id)}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-all ${
              task.status === "Completed"
                ? "bg-green-50 text-green-600"
                : "bg-gray-50 text-gray-600"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {task.status === "Completed" ? "Completed" : "Complete"}
          </button>

          <div className="text-gray-400">
            Created on:{" "}
            <span className="text-gray-500 font-medium">
              {formatDate(task.createdOn)}
            </span>
          </div>
        </div>

        <div className="text-sm text-gray-500">{task.status}</div>
      </div>
    </div>
  );
};

// ---- Completed Card ----

interface CompletedCardProps {
  item: CompletedItem;
}

const CompletedCard: React.FC<CompletedCardProps> = ({ item }) => {
  return (
    <div className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
        <CheckCircle2 className="w-5 h-5 text-green-500" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-gray-800 text-sm">
              {item.title}
            </h4>
            <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
          </div>
          <img
            src={item.image}
            alt="done"
            className="w-14 h-12 rounded-md object-cover"
          />
        </div>
        <div className="text-xs text-gray-400 mt-2">{item.completedTime}</div>
      </div>
    </div>
  );
};

// ---- Sample data ----
const initialTasks: Task[] = [
  {
    id: 1,
    title: "Attend Nischal's Birthday Party",
    desc: "Buy gifts on the way and pick up cake from the bakery. Be there by 6 PM.",
    date: "2023-06-20",
    createdOn: "2023-06-15",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    priority: "Moderate",
    status: "Not Started",
  },
  {
    id: 2,
    title: "Landing Page Design for TravelDays",
    desc: "Deliver the final landing page and review the hero section with the client.",
    date: "2023-06-20",
    createdOn: "2023-06-18",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Presentation on Final Product",
    desc: "Polish slides and live-demo for stakeholders.",
    date: "2023-08-19",
    createdOn: "2023-08-10",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400",
    priority: "Moderate",
    status: "In Progress",
  },
  {
    id: 4,
    title: "Team Lunch",
    desc: "Catch up with the design team at the new cafe.",
    date: "2023-06-20",
    createdOn: "2023-06-15",
    image: "",
    priority: "Moderate",
    status: "Not Started",
  },
];

const sampleCompleted: CompletedItem[] = [
  {
    id: 100,
    title: "Walk the dog",
    desc: "Take the dog to the park and bring treats as well.",
    completedTime: "Completed 2 days ago",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 101,
    title: "Conduct meeting",
    desc: "Met with client and finalized requirements.",
    completedTime: "Completed 2 days ago",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400",
  },
];

// ---- Main Dashboard ----
export default function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [completed, setCompleted] = useState<CompletedItem[]>(sampleCompleted);

  // -- DROPDOWN STATES --
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [dateRange, setDateRange] = useState("June 2025-December 2025");

  // Actions
  const handleShare = (task: Task) => {
    console.log("Sharing task:", task.title);
    navigate("/post-profile");
  };

  const completeTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (t.status !== "Completed") {
            const newItem: CompletedItem = {
              id: Date.now(),
              title: t.title,
              desc: t.desc,
              completedTime: nowRelative(),
              image: t.image,
            };
            setCompleted((c) => [newItem, ...c]);
            return { ...t, status: "Completed" };
          }
          return { ...t, status: "Not Started" };
        }
        return t;
      })
    );
  };

  const editTask = (task: Task) => {
    alert(`Edit requested for: ${task.title}`);
  };

  const handleSelectRange = (rangeName: string) => {
    setDateRange(rangeName);
    setShowDateDropdown(false); // Close dropdown after selection
  };

  // Metrics
  const total = tasks.length + completed.length;
  const pctCompleted = Math.round(
    (completed.length / Math.max(1, total)) * 100
  );
  const pctInProgress = Math.round(
    (tasks.filter((t) => t.status === "In Progress").length /
      Math.max(1, total)) *
      100
  );
  const pctNotStarted = Math.round(
    (tasks.filter((t) => t.status === "Not Started").length /
      Math.max(1, total)) *
      100
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Overlay to close dropdown if clicking outside */}
      {showDateDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowDateDropdown(false)}
        ></div>
      )}

      <header className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            All Tasks
          </h3>
          <p className="text-gray-500 mt-1">
            Track and manage your application to-dos.
          </p>
          <div className="hidden md:block pt-5 relative z-20">
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-200"
            >
              {dateRange}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showDateDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* The "Card" Dropdown */}
            {showDateDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-blue-500" />
                    Select Period
                  </h4>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleSelectRange("June 2025-December 2025")}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-600 hover:text-blue-600 flex justify-between group"
                  >
                    <span>Jun - Dec 2025</span>
                    {dateRange === "June 2025-December 2025" && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSelectRange("January 2026-June 2026")}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-600 hover:text-blue-600 flex justify-between group"
                  >
                    <span>Jan - Jun 2026</span>
                    {dateRange === "January 2026-June 2026" && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSelectRange("All Time")}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-50 text-gray-600 hover:text-blue-600 flex justify-between group"
                  >
                    <span>All Time</span>
                    {dateRange === "All Time" && (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    )}
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400 text-center">
                    Custom Range?
                  </p>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="date"
                      className="w-full border border-gray-200 rounded px-2 py-1 text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: task list */}
        <section className="lg:col-span-2">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-red-500 font-semibold text-lg">
              <div className="p-1 bg-red-100 rounded-lg">
                <CheckCircle2 size={18} />
              </div>
              To-Do
            </div>
            <div>
              <p className="text-gray-500">June 2025 December 2025</p>
            </div>
          </div>

          <div className="space-y-4">
            {tasks.map((t) => (
              <TaskCard
                key={t.id}
                task={t}
                onComplete={completeTask}
                onEdit={editTask}
                onShare={handleShare}
              />
            ))}
          </div>
        </section>

        <aside className="lg:col-span-1 flex flex-col gap-6">
          {/* Status Widget */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-red-500 mb-6 flex items-center gap-2">
              <div className="p-1 bg-red-100 rounded-lg">
                <Clock size={16} />
              </div>{" "}
              Task Status
            </h3>

            <div className="flex items-center justify-between gap-4">
              <CircularProgress
                percentage={pctCompleted}
                label="Completed"
                accent="green"
              />
              <CircularProgress
                percentage={pctInProgress}
                label="In Progress"
                accent="blue"
              />
              <CircularProgress
                percentage={pctNotStarted}
                label="Not Started"
                accent="red"
              />
            </div>

            <div className="mt-6 text-xs text-gray-500">
              Total tasks:{" "}
              <span className="font-medium text-gray-700">{total}</span>
            </div>
          </div>

          {/* Completed tasks list */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-red-500 mb-4 flex items-center gap-2">
              <div className="p-1 bg-red-100 rounded-lg">
                <CheckCircle2 size={16} />
              </div>{" "}
              Completed
            </h3>

            <div className="space-y-3">
              {completed.map((c) => (
                <CompletedCard key={c.id} item={c} />
              ))}
            </div>

            <div className="mt-4 text-xs text-gray-400">
              {completed.length} completed
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}