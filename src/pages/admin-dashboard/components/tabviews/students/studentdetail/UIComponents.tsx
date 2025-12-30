// src/components/StudentDetail/UIComponents.tsx
import React from 'react';
import type { AvatarProps, InfoCardProps, StatusBadgeProps, TabButtonProps } from './types';

export const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50/50">
    <div className="bg-white p-2 rounded-md border border-slate-100 text-slate-400">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value || "N/A"}</p>
    </div>
  </div>
);

export const Avatar: React.FC<AvatarProps> = ({ name, size = "sm" }) => {
  const sizeClasses = size === "xl" ? "h-20 w-20 text-3xl shadow-md border-4 border-white" : "h-10 w-10 text-sm";
  const colors = ["bg-indigo-100 text-indigo-700", "bg-rose-100 text-rose-700", "bg-emerald-100 text-emerald-700", "bg-amber-100 text-amber-700"];
  const colorIndex = name ? name.length % colors.length : 0;
  const colorClass = colors[colorIndex];

  return (
    <div className={`${sizeClasses} rounded-full ${colorClass} flex items-center justify-center font-bold flex-shrink-0`}>
      {name ? name.charAt(0) : "U"}
    </div>
  );
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isActive = status === "Active";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${isActive
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-rose-50 text-rose-700 border-rose-100"
      }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
      {status}
    </span>
  );
};

export const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap ${isActive
      ? "text-indigo-600 border-b-2 border-indigo-600"
      : "text-slate-500 hover:text-slate-800 border-b-2 border-transparent hover:border-slate-300"
      }`}
    style={{ marginBottom: '-1px' }}
  >
    {label}
  </button>
);