export const OverviewTab = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#FCD34D] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:shadow-md transition">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                        <h4 className="text-slate-800 font-medium text-sm">Total Courses</h4>
                        <span className="text-4xl font-bold text-slate-900">07</span>
                        <p className="text-xs text-slate-800/70 font-medium mt-1">2 Electives</p>
                    </div>
                    <div className="bg-[#FFCACA] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:shadow-md transition">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                        <h4 className="text-rose-900 font-medium text-sm">Attendance</h4>
                        <span className="text-4xl font-bold text-rose-950">60%</span>
                        <p className="text-xs text-rose-800/70 font-medium mt-1">24% Absent</p>
                    </div>
                    <div className="bg-[#CFD8DC] p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center space-y-1 relative overflow-hidden group hover:shadow-md transition">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                        <h4 className="text-slate-700 font-medium text-sm">Requested Leaves</h4>
                        <span className="text-4xl font-bold text-slate-800">17</span>
                        <p className="text-xs text-slate-600 font-medium mt-1">11 Approved</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Today's Classes</h3>
                            <p className="text-xs text-slate-500 mt-1">Schedule for Thursday, May 16</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-purple-100/50 p-4 rounded-xl border-l-4 border-purple-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <p className="text-xs font-bold text-purple-600 mb-1">CS 102</p>
                                <h4 className="font-bold text-slate-800">Circuit Theory</h4>
                                <p className="text-xs text-slate-500 font-medium">Room SF 13</p>
                            </div>
                            <div className="text-right flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                                <span className="font-bold text-slate-700 block">8:00 AM</span>
                                <span className="text-xs font-bold text-rose-500 bg-rose-100 px-2 py-0.5 rounded ml-2 sm:ml-0 sm:mt-1">Absent</span>
                            </div>
                        </div>
                        <div className="bg-[#DAF7A6] p-4 rounded-xl border-l-4 border-lime-500 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
                            <div>
                                <p className="text-xs font-bold text-lime-800 mb-1">MAT 104</p>
                                <h4 className="font-bold text-slate-900">Discrete Math</h4>
                                <p className="text-xs text-slate-700 font-medium">Room FF 10</p>
                            </div>
                            <div className="text-right flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                                <span className="font-bold text-slate-900 block">10:30 AM</span>
                                <span className="text-xs font-bold text-emerald-700 bg-white/50 px-2 py-0.5 rounded ml-2 sm:ml-0 sm:mt-1">Attended</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-[#1e293b] text-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-lg mb-6 border-b border-slate-700 pb-4">Recent Activity</h3>
                    <div className="space-y-6 relative">
                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-700 rounded-full"></div>
                        <div className="flex gap-4 relative">
                            <div className="w-4 h-4 rounded-full bg-[#1e293b] border-2 border-indigo-400 z-10 mt-1"></div>
                            <div>
                                <p className="text-sm font-medium text-slate-200">Checked in for Discrete Math</p>
                                <p className="text-xs text-slate-500 mt-1">Today, 10:30 AM</p>
                            </div>
                        </div>
                        <div className="flex gap-4 relative">
                            <div className="w-4 h-4 rounded-full bg-[#1e293b] border-2 border-emerald-400 z-10 mt-1"></div>
                            <div>
                                <p className="text-sm font-medium text-slate-200">Completed Biometric Registration</p>
                                <p className="text-xs text-slate-500 mt-1">Today, 10:00 AM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};