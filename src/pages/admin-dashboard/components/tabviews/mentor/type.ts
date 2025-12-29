// types.ts
export interface Mentor {
  id: number | string; // ✅ This allows both, preventing errors
  name: string;
  email: string;
  specialization: string;
  studentsAssigned: number;
  status: "Active" | "Inactive";
  phone: string;
  date: string;
  bio: string;
  progress: number; 
}
