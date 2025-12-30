'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import StudentList from './StudentList';
import StudentDetail from './studentdetail/main';


// Exporting the interface so child components can use it
export interface Student {
  id: number;
  name: string;
  email: string;
  course: string;
  progress: string;
  status: string;
  phone: string;
  date: string;
  bio: string;
}

const studentsData: Student[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahu******@gmail.com",
    course: "Dr. Rahul Sharma",
    progress: "85%",
    status: "Active",
    phone: "+91 98******10",
    date: "12 Jan, 2024",
    bio: "Focused on Full Stack Development with React and Node.js."
  },
  {
    id: 2,
    name: "Ananya Verma",
    email: "ana******@gmail.com",
    course: "Dr. Rahul Sharma",
    progress: "72%",
    status: "Active",
    phone: "+91 98******45",
    date: "15 Feb, 2024",
    bio: "Specializing in Marketing strategies and Business Analysis."
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "am******@gmail.com",
    course: "Dr. Amit Verma",
    progress: "40%",
    status: "Inactive",
    phone: "+91 98******90",
    date: "10 Mar, 2024",
    bio: "Currently on leave. Interests include mechanical design."
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sne******@gmail.com",
    course: "Dr. Rahul Sharma",
    progress: "95%",
    status: "Active",
    phone: "+91 98******65",
    date: "05 Apr, 2024",
    bio: "Top performer in UI/UX and Graphic Design modules."
  },
];

export default function StudentDashboard() {
  // Removed 'navigate' since it was unused
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // ✅ Read id from URL to sync state on load or URL change
  useEffect(() => {
    const id = searchParams.get('id');

    if (id) {
      // Ensure we compare numbers correctly
      const student = studentsData.find((s) => s.id === Number(id));
      setSelectedStudent(student || null);
    } else {
      setSelectedStudent(null);
    }
  }, [searchParams]);

  // ✅ View student → set ID in URL (keeps user on same page but changes query param)
  const handleView = (student: Student) => {
    setSearchParams({
      tab: 'students',
      id: student.id.toString(),
    });
  };

  // ✅ Back to list → remove ID from URL
  const handleBack = () => {
    setSearchParams({
      tab: 'students',
    });
  };

  // ---------- VIEW RENDER ----------
  if (selectedStudent) {
    return (
      <StudentDetail
        student={selectedStudent}
        onBack={handleBack}
      />
    );
  }

  return (
    <StudentList
      students={studentsData}
      onView={handleView}
    />
  );
}