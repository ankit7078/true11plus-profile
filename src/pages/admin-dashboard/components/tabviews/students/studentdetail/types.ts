// src/components/StudentDetail/types.ts

// ================= GLOBAL SHARED TYPES =================

export interface Student {
  name: string;
  id: string | number;
  course: string;
  status: string;
  progress: string;
  bio: string;
  email: string;
  phone: string;
  date: string;
}

// ================= COMPONENT PROPS =================

export interface StudentDetailProps {
  student?: Student[];
  onBack: () => void;
}

export interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export interface InfoCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

export interface AvatarProps {
  name: string;
  size?: 'sm' | 'xl';
}

export interface StatusBadgeProps {
  status: string;
}

export interface CircularProgressProps {
  percentage?: number;
  label?: string;
  accent?: "green" | "blue" | "red";
}

// ================= ORIGINAL TASK TYPES (Assignments/Projects) =================

export interface ChecklistItem {
  id: number;
  text: string;
  done: boolean;
}

// Used in the "Tasks & Projects" tab
export interface AssignmentTask {
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

// ================= NEW DASHBOARD TYPES (Student Tasks Tab) =================

// Used in the new "Student Tasks" tab
export interface DashboardTask {
  id: number;
  title: string;
  desc: string;
  date: string;
  createdOn: string;
  image: string;
  priority: string;
  status: "Not Started" | "In Progress" | "Completed";
}

export interface CompletedDashboardItem {
  id: number;
  title: string;
  desc: string;
  completedTime: string;
  image: string;
}

// ================= SOCIAL/ACTIVITY TYPES =================

export interface Post {
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



export interface ChecklistItem {
  id: number;
  text: string;
  done: boolean;
}

export interface TaskPropes {
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
