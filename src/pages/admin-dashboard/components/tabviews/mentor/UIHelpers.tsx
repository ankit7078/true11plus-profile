'use client'

import React from 'react';

// --- Types ---

interface StatusBadgeProps {
  status: string;
}

interface AvatarProps {
  name: string;
  size?: 'sm' | 'lg' | 'xl';
}

interface ProgressBarProps {
  value: number; // 0-100
}

// --- Components ---

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = status === "Active" 
    ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
    : "bg-red-100 text-red-700 border-red-200";
    
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles}`}>
      {status}
    </span>
  );
};

export const Avatar: React.FC<AvatarProps> = ({ name, size = "sm" }) => {
  let sizeClasses = "h-10 w-10 text-sm";
  if (size === "lg") sizeClasses = "h-24 w-24 text-3xl";
  if (size === "xl") sizeClasses = "h-20 w-20 text-3xl"; // Added xl for Detail View
  
  const colors = ["bg-indigo-100 text-indigo-700", "bg-rose-100 text-rose-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700"];
  const colorIndex = name ? name.length % colors.length : 0;
  
  return (
    <div className={`${sizeClasses} ${colors[colorIndex]} rounded-full flex items-center justify-center font-bold flex-shrink-0`}>
      {name ? name.charAt(0) : "U"}
    </div>
  );
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
  <div className="flex items-center gap-2">
    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${value}%` }} />
    </div>
    <span className="text-sm text-slate-600">{value}%</span>
  </div>
);