export const StatusBadge = ({ status }) => {
  const styles = status === "Active" 
    ? "bg-emerald-100 text-emerald-700" 
    : "bg-red-100 text-red-700";
    
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles}`}>
      {status}
    </span>
  );
};

export const Avatar = ({ name, size = "sm" }) => {
  const sizeClasses = size === "lg" ? "h-24 w-24 text-3xl" : "h-10 w-10 text-sm";
  
  return (
    <div className={`${sizeClasses} rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold`}>
      {name.charAt(0)}
    </div>
  );
};

export const ProgressBar = ({ value }) => (
  <div className="flex items-center gap-2">
    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
      <div className="h-full bg-emerald-500" style={{ width: value }} />
    </div>
    <span className="text-sm text-slate-600">{value}</span>
  </div>
);