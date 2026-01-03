import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  School,
  Award,
  Newspaper,
  CalendarDays,
  Megaphone,
  MessageSquare,
  HelpCircle,
  Scale,
  ClipboardList
} from 'lucide-react';

export type UserRole = 'admin' | 'mentor' | 'user';

export interface SidebarItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const SIDEBAR_ITEMS: Record<UserRole, SidebarItem[]> = {
  admin: [
    { label: 'Admin Overview', path: '/admin', icon: <LayoutDashboard size={16} /> },
    { label: 'Student', path: '/admin/students', icon: <GraduationCap size={16} /> },
    { label: 'Mentor', path: '/admin/mentors', icon: <Briefcase size={16} /> },
    { label: 'University', path: '/admin/university', icon: <School size={16} /> },
    { label: 'Scholarship', path: '/admin/scholarship', icon: <Award size={16} /> },
    { label: 'Blog', path: '/admin/blog', icon: <Newspaper size={16} /> },
    { label: 'Events', path: '/admin/events', icon: <CalendarDays size={16} /> },
    { label: 'News & Update', path: '/admin/newsandupdate', icon: <Megaphone size={16} /> },
    { label: 'Enquiry', path: '/admin/enquiry', icon: <MessageSquare size={16} /> },
    { label: 'Help & Support', path: '/admin/helpandsupport', icon: <HelpCircle size={16} /> },
    { label: 'Legals', path: '/admin/legals', icon: <Scale size={16} /> },
  ],
  mentor: [
    { label: 'Overview', path: '/mentor', icon: <LayoutDashboard size={16} /> },
    { label: 'Students', path: '/mentor/students', icon: <GraduationCap size={16} /> },
  ],
  user: [
    { label: 'Overview', path: '/user/dashboard', icon: <LayoutDashboard size={16} /> },
    { label: 'University', path: '/user/university', icon: <School size={16} /> },
    { label: 'Scholarship', path: '/user/scholarship', icon: <Award size={16} /> },
    { label: 'Your Task', path: '/user/taskuser', icon: <ClipboardList size={16} /> },
  ],
};