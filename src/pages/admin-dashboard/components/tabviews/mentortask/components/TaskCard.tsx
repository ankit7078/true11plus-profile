import { Calendar, Edit2, Image, CheckCircle2 } from "lucide-react";
import { formatDate } from "../../../../../../utils/helpers";

/* ---------------- TYPES ---------------- */

export type TaskStatus = "Completed" | "In Progress" | "Pending";

export interface Task {
  id: number;
  title: string;
  desc: string;
  date: string;
  createdOn: string;
  priority: "Low" | "Medium" | "High";
  status: TaskStatus;
  image?: string;
}

interface TaskCardProps {
  task: Task;
  onComplete: (id: number) => void;
  onEdit: (task: Task) => void;
}

/* ---------------- COMPONENT ---------------- */

const TaskCard = ({ task, onComplete, onEdit }: TaskCardProps) => {
  const statusDot =
    task.status === "Completed"
      ? "border-green-400 bg-green-100"
      : task.status === "In Progress"
      ? "border-blue-400 bg-blue-50"
      : "border-red-300 bg-red-50";

  const priorityColor =
    task.priority === "High"
      ? "text-red-600"
      : task.priority === "Medium"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="bg-[var(--bg-main)] group p-4 rounded-xl shadow-xs hover:shadow-sm transition-shadow">
      {/* -------- TOP SECTION -------- */}
      <div className="flex justify-between gap-4">
        <div className="flex gap-3 items-start">
          {/* Status Dot */}
          <div className={`w-3 h-3 mt-2 rounded-full border-2 ${statusDot}`} />

          {/* Task Info */}
          <div>
            <h4 className="font-semibold text-lg group-hover:text-[var(--purple)] transition">
              {task.title}
            </h4>

            <p className="text-gray-500 text-sm mt-1 max-w-[42ch]">
              {task.desc}
            </p>

            <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(task.date)}
              </span>

              <span>•</span>

              <span>
                Priority:{" "}
                <span className={`font-medium ${priorityColor}`}>
                  {task.priority}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* -------- ACTIONS -------- */}
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {task.image ? (
            <img
              src={task.image}
              alt="task"
              className="w-24 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-24 h-16 rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-gray-300">
              <Image className="w-5 h-5" />
            </div>
          )}
        </div>
      </div>

      {/* -------- FOOTER -------- */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onComplete(task.id)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition ${
              task.status === "Completed"
                ? "bg-green-50 text-green-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {task.status === "Completed" ? "Completed" : "Complete"}
          </button>

          <span className="text-xs text-gray-400">
            Created on:{" "}
            <span className="text-gray-500 font-medium">
              {formatDate(task.createdOn)}
            </span>
          </span>
        </div>

        <span className="text-sm font-medium text-gray-500">
          {task.status}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
