import React, { useState } from 'react';
import { Plus } from "lucide-react";

// 1. Define the shape of your form data
export interface TaskFormData {
  title: string;
  desc: string;
  date: string;
  priority: string; // You could also use a union type: "Low" | "Moderate" | "High"
  image: string;
}

// 2. Define the props the component accepts
interface TaskFormProps {
  onAddTask: (data: TaskFormData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  // 3. Apply the interface to the state
  const [form, setForm] = useState<TaskFormData>({
    title: "",
    desc: "",
    date: "",
    priority: "Moderate",
    image: ""
  });

  // 4. Type the form event
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Please provide a task title.");
    
    onAddTask(form);
    
    // Reset form
    setForm({
      title: "",
      desc: "",
      date: "",
      priority: "Moderate",
      image: ""
    });
  };

  return (
    <div className="bg-white p-5 rounded-xl mb-6 shadow-xs hover:shadow-sm border border-gray-100">
      <h4 className="pb-3 font-semibold text-gray-700">Create Tasks</h4>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Task title"
          className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
        <input
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          type="date"
          className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
        <input
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          placeholder="Description"
          className="p-2 border border-gray-200 rounded-md md:col-span-2 focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
        <input
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          placeholder="Image URL (optional)"
          className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          className="p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-100 bg-white"
        >
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 w-full max-w-40 rounded-md bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 justify-center font-medium transition-colors"
        >
          <Plus size={16} /> Add
        </button>
      </form>
    </div>
  );
};

export default TaskForm;