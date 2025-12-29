'use client'

import { useState } from 'react';
import StudentDetail from './StudentDetail';
import MentorList from './MentorList';
import type { Mentor } from './type';

// Updated data to match the Mentor Interface strict typing
export const studentsData: Mentor[] = [
    {
        id: 1,
        name: "Dr. Rahul Sharma",
        email: "rahu******@gmail.com",
        specialization: "Computer Science",
        studentsAssigned: 45,
        status: "Active",
        phone: "+91 98******10",
        date: "12 Jan, 2024",
        bio: "Senior Lecturer with 10 years of experience in Full Stack Development.",
        progress: 85 // Added numeric progress for the bar
    },
    {
        id: 2,
        name: "Prof. Ananya Verma",
        email: "ana******@gmail.com",
        specialization: "Business Management",
        studentsAssigned: 32,
        status: "Active",
        phone: "+91 98******45",
        date: "15 Feb, 2024",
        bio: "Expert in Marketing strategies and Business Analysis for startups.",
        progress: 60
    },
    {
        id: 3,
        name: "Er. Amit Kumar",
        email: "am******@gmail.com",
        specialization: "Engineering",
        studentsAssigned: 12,
        status: "Inactive",
        phone: "+91 98******90",
        date: "10 Mar, 2024",
        bio: "Mechanical design specialist. Currently on sabbatical.",
        progress: 20
    },
    {
        id: 4,
        name: "Sneha Patel",
        email: "sne******@gmail.com",
        specialization: "UI/UX Design",
        studentsAssigned: 50,
        status: "Active",
        phone: "+91 98******65",
        date: "05 Apr, 2024",
        bio: "Lead Designer and mentor for advanced graphic design modules.",
        progress: 95
    },
];

export default function StudentDashboard() {
    // Correctly typed state
    const [selectedStudent, setSelectedStudent] = useState<Mentor | null>(null);

    // View Logic
    if (selectedStudent) {
        return (
            <StudentDetail
                student={selectedStudent}
                onBack={() => setSelectedStudent(null)}
            />
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <MentorList
                students={studentsData}
                onView={(student) => setSelectedStudent(student)}
            />
        </div>
    );
}