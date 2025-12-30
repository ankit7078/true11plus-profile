
import { FolderOpen, Download } from 'lucide-react';

export const DocumentsTab = () => (
  <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm min-h-[400px] flex flex-col items-center justify-center py-12 text-center">
    <div className="bg-indigo-50 p-4 rounded-full mb-4">
      <FolderOpen className="w-8 h-8 text-indigo-500" />
    </div>
    <h3 className="text-lg font-bold text-slate-900">No Documents Uploaded</h3>
    <button className="mt-6 flex items-center gap-2 text-sm bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 hover:border-slate-400 transition">
      <Download className="w-4 h-4" />
      Upload New File
    </button>
  </div>
);