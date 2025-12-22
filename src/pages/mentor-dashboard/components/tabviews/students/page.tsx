'use client'

import { useState } from 'react';
import StudentList from './StudentList';
import StudentDetail from './StudentDetail';

const studentsData = [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahu******@gmail.com",
        course: "Computer Science",
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
        course: "Business Management",
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
        course: "Engineering",
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
        course: "Design",
        progress: "95%",
        status: "Active",
        phone: "+91 98******65",
        date: "05 Apr, 2024",
        bio: "Top performer in UI/UX and Graphic Design modules."
    },
];

export default function StudentDashboard() {
    const [selectedStudent, setSelectedStudent] = useState(null);

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
        <StudentList
            students={studentsData}
            onView={(student) => setSelectedStudent(student)}
        />
    );
}