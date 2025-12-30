// src/components/StudentDetail/tabs/ProfileTab.tsx
import React from 'react';
import { Calendar, Mail, MapPin, Phone } from "lucide-react";
import { InfoCard } from "../UIComponents";

export interface Student {
  id: string | number;
  name: string;
  email: string;
  course: string;
  progress: string;
  status: string;
  // Optional fields
  bio?: string;
  phone?: string;
  date?: string;
}

interface ProfileTabProps {
  student: Student;
}

// --- Component ---
export const ProfileTab: React.FC<ProfileTabProps> = ({ student }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* --- Left Column: Bio & Contact Info --- */}
        <div className="md:col-span-2 space-y-6">
            
            {/* About Section */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">About Student</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    {/* Fallback text if bio is missing */}
                    {student.bio || "No biography provided."}
                </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/60 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InfoCard 
                        icon={Mail} 
                        label="Email Address" 
                        value={student.email} 
                    />
                    <InfoCard 
                        icon={Phone} 
                        label="Phone Number" 
                        value={student.phone || "N/A"} 
                    />
                    <InfoCard 
                        icon={Calendar} 
                        label="Date Joined" 
                        value={student.date || "N/A"} 
                    />
                    <InfoCard 
                        icon={MapPin} 
                        label="Location" 
                        value="New Delhi, India" 
                    />
                </div>
            </div>
        </div>

        {/* --- Right Column: Mentorship Card --- */}
        <div className="space-y-6">
            <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-md relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-1">Mentorship Session</h3>
                    <p className="text-indigo-200 text-sm mb-4">Next scheduled session</p>
                    
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                        <Calendar className="w-5 h-5 text-indigo-300" />
                        <div>
                            <p className="font-semibold text-sm">Thursday, 24 Oct</p>
                            <p className="text-xs text-indigo-300">4:00 PM - 5:00 PM</p>
                        </div>
                    </div>

                    <button className="mt-4 w-full py-2 bg-white text-indigo-900 rounded-lg text-sm font-bold hover:bg-indigo-50 transition">
                        Reschedule
                    </button>
                </div>
                {/* Decorative Blur */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-700 rounded-full blur-2xl opacity-50 pointer-events-none" />
            </div>
        </div>
    </div>
);