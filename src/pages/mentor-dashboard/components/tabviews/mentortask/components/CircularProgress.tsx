
const CircularProgress = ({ percentage = 0, label = "", accent = "green" }) => {
  const size = 64;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} stroke="#eef2f7" fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              stroke: accent === "green" ? "#34d399" : accent === "blue" ? "#60a5fa" : "#f87171",
              transition: "stroke-dashoffset 600ms ease",
            }}
            fill="none"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-sm font-semibold text-gray-700">{Math.round(percentage)}%</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">{label}</div>
    </div>
  );
};

export default CircularProgress;