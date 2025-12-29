import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  Plus,
  Search,
  X,
  ChevronRight,
  FileText,
  Filter,
  ArrowLeft,
  Calendar,
  Clock,
  ChevronDown,
  Check,
  Trash2
} from 'lucide-react';

// --- Types ---
type CategoryType = 'Academic' | 'Exam' | 'Campus' | 'Admissions';

interface NewsItem {
  id: number;
  title: string;
  category: CategoryType;
  date: string;
  readTime: string;
  author: string;
  content: string;
  isPinned?: boolean;
}

const NewsDashboard: React.FC = () => {
  // --- Mock Data ---
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: "Final Semester Exam Schedule Released",
      category: "Exam",
      date: "Jan 05, 2025",
      readTime: "2 min read",
      author: "Examination Cell",
      content: "The datesheet for the Spring 2025 final examinations has been uploaded. Students are requested to check the portal immediately. Any discrepancies regarding subject codes or timing must be reported to the Examination Cell by Jan 10th. Please ensure you have your admit cards downloaded before the commencement of practicals.",
      isPinned: true
    },
    {
      id: 2,
      title: "New Yoga Therapy Certification Course",
      category: "Academic",
      date: "Jan 08, 2025",
      readTime: "4 min read",
      author: "Dr. Aditi Verma",
      content: "We are excited to introduce a 6-month specialized course in Yoga Therapy starting this March. This course is designed for advanced practitioners who wish to apply yoga for healing common ailments. Topics include therapeutic sequencing, anatomy of injury, and case studies. Enrollments are open now via the student dashboard.",
      isPinned: false
    },
    {
      id: 3,
      title: "Campus Library Renovation Notice",
      category: "Campus",
      date: "Dec 28, 2024",
      readTime: "1 min read",
      author: "Admin Dept",
      content: "The central library will remain closed for maintenance and digitization work from Jan 15th to Jan 20th. During this period, the physical reading rooms will be inaccessible. However, all digital resources, e-books, and research journals remain accessible through the library portal 24/7.",
      isPinned: false
    },
    {
      id: 4,
      title: "Admissions Open for Batch 2025",
      category: "Admissions",
      date: "Jan 02, 2025",
      readTime: "3 min read",
      author: "Registrar Office",
      content: "Applications are now invited for the 200-hour and 500-hour Yoga Teacher Training programs for the upcoming academic year. We have introduced new scholarships for meritorious students. Early bird discounts apply until Feb 1st. Visit the admissions block for brochures.",
      isPinned: false
    }
  ]);

  const [filter, setFilter] = useState<CategoryType | 'All'>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredNews = news.filter(item => {
    const matchesFilter = filter === 'All' || item.category === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this update?")) {
      setNews(news.filter(item => item.id !== id));
      if (selectedNews?.id === id) setSelectedNews(null);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: NewsItem = {
      id: Date.now(),
      title: "New Announcement",
      category: "Academic",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: "1 min read",
      author: "Admin",
      content: "This is a newly created update. Details will be added shortly."
    };
    setNews([newItem, ...news]);
    setIsCreateModalOpen(false);
  };

  const getCategoryStyle = (cat: CategoryType) => {
    switch (cat) {
      case 'Academic': return 'bg-blue-50 text-blue-700 border-blue-100 ring-blue-500/20';
      case 'Exam': return 'bg-rose-50 text-rose-700 border-rose-100 ring-rose-500/20';
      case 'Campus': return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/20';
      case 'Admissions': return 'bg-purple-50 text-purple-700 border-purple-100 ring-purple-500/20';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const categories = ['All', 'Academic', 'Exam', 'Campus', 'Admissions'];

  return (
    <div className="min-h-screen text-gray-800 p-4">
      <div className="">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">News & Updates</h3>
            <p className="text-gray-500 mt-1 text-sm md:text-base">Stay informed with the latest institute announcements.</p>
          </div>

          {!selectedNews && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-md font-semibold shadow-xs transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Plus className="w-5 h-5" /> Post Update
            </button>
          )}
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="relative">

          {!selectedNews && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">

              {/* ================= Filters & Search Bar ================= */}
              <div className="relative mb-8 z-20">
                <div className="flex flex-col md:flex-row items-center justify-between rounded-md bg-white/90 backdrop-blur-md shadow-xs border border-gray-100 md:border-none">

                  {/* Search Input */}
                  <div className="flex items-center gap-3 px-4 py-3 w-full md:w-80 border-b md:border-b-0 border-gray-100">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search announcements..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400 focus:placeholder-gray-300"
                    />
                  </div>

                  {/* Filter Dropdown Trigger */}
                  <div className="relative w-full md:w-auto" ref={dropdownRef}>
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="flex items-center justify-between gap-3 px-5 py-3 w-full md:w-auto hover:bg-gray-50 transition-colors md:rounded-r-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-md bg-purple-50 text-purple-600 shrink-0">
                          <Filter className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="block text-xs text-gray-400 md:hidden">Filter by</span>
                          <span className="block text-sm font-bold text-gray-900">{filter}</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* The Dropdown Menu */}
                    {isFilterOpen && (
                      <div className="absolute top-full right-0 mt-2 w-full md:w-56 bg-white rounded-md shadow-lg border border-gray-100 animate-in fade-in zoom-in-95 duration-200 overflow-hidden z-30">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setFilter(cat as any);
                              setIsFilterOpen(false);
                            }}
                            className={`
                                w-full px-4 py-2.5 flex items-center justify-between text-sm transition-colors
                                ${filter === cat ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-600 hover:bg-purple-50 hover:text-purple-500'}
                              `}
                          >
                            {cat}
                            {filter === cat && <Check className="w-4 h-4" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>


              {/* News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-0">
                {filteredNews.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedNews(item)}
                    className="group bg-white rounded-md shadow-xs hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer"
                  >

                    {/* Card Header */}
                    <div className="p-5 md:p-6 pb-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className={`px-2.5 py-1 rounded-full !text-xs tracking-wider font-bold border ${getCategoryStyle(item.category)}`}>
                          {item.category}
                        </span>
                        {item.isPinned && (
                          <div className="bg-orange-50 text-orange-600 p-1.5 rounded-full ring-1 ring-orange-100 animate-pulse">
                            <Bell className="w-3.5 h-3.5 fill-current" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 !text-sm line-clamp-3 leading-relaxed">
                        {item.content}
                      </p>
                    </div>

                    {/* Spacer */}
                    <div className="flex-1"></div>

                    {/* Card Footer */}
                    <div className="px-5 md:px-6 pb-5 pt-3 mt-2 flex items-center justify-between border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-900">{item.author}</span>
                        <span className="text-xs text-gray-400 mt-0.5">{item.date}</span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {filteredNews.length === 0 && (
                  <div className="col-span-full py-20 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No updates found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search query.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VIEW 2: DETAIL VIEW */}
          {selectedNews && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 space-y-6 md:space-y-8">

              <div className="bg-white rounded-md shadow-xs p-6 space-y-6">
                <div className="space-y-6">

                  <div className='flex items-start justify-between gap-4'>
                    {/* Title */}
                    <h3 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight max-w-4xl">
                      {selectedNews.title}
                    </h3>
                    <button
                      onClick={() => handleDelete(selectedNews.id)}
                      className="shrink-0 flex items-center justify-center w-10 h-10 md:w-auto md:h-auto p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all font-medium border border-transparent hover:border-red-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>


                  {/* Category & Date Pills */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold border tracking-wide shadow-xs ${getCategoryStyle(selectedNews.category)}`}>
                      {selectedNews.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-xs">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" /> {selectedNews.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] md:text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-xs">
                      <Clock className="w-3.5 h-3.5 text-purple-400" /> {selectedNews.readTime}
                    </span>
                  </div>
                </div>

                {/* --- Content Section --- */}
                <div>
                  <div className="prose prose-base md:prose-lg prose-indigo text-gray-600 leading-relaxed pt-2 md:pt-4">
                    {/* Drop Cap styling for first letter */}
                    <p className="first-letter:text-4xl md:first-letter:text-5xl first-letter:font-bold first-letter:text-purple-800 first-letter:float-left first-letter:mr-2 md:first-letter:mr-3 first-letter:mt-[-4px] md:first-letter:mt-[-6px]">
                      {selectedNews.content}
                    </p>

                    <div className="my-6 md:my-8 p-4 md:p-6 bg-purple-50/50 rounded-xl border-l-4 border-purple-500 text-purple-800 italic text-sm md:text-base">
                      "Students are advised to regularly check the official portal for any further amendments to this update.
                      For specific queries, please contact the administration office during working hours."
                    </div>
                  </div>

                  {/* --- Attachment Card --- */}
                  <div className="mt-8 md:mt-12">
                    <h4 className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 md:mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Attached Resources
                    </h4>

                    <div className="group flex items-center justify-between p-3 md:p-4 bg-purple-50 border border-gray-200 rounded-md hover:bg-white hover:border-purple-200 hover:shadow-xs transition-all duration-300 cursor-pointer">

                      <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">

                        {/* Icon Box - responsive sizing */}
                        <div className="w-10 h-10 shrink-0 rounded-md bg-white border border-gray-200 flex items-center justify-center text-purple-500 shadow-xs group-hover:scale-105 transition-transform duration-300">
                          <FileText className="w-5 h-5 md:w-6 md:h-6" />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          {/* Truncate ensures long filenames get '...' on mobile */}
                          <div className="font-bold text-gray-900 text-sm md:text-base truncate group-hover:text-purple-700 transition-colors">
                            Official_Notice_2025_Final_Draft.pdf
                          </div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5 md:mt-1">
                            PDF Document • 2.4 MB
                          </div>
                        </div>
                      </div>

                      {/* Right Side: Download Button */}
                      <div className="shrink-0 ml-3 bg-white p-2 md:p-2.5 rounded-full border border-purple-200 text-gray-400 group-hover:text-purple-600 group-hover:border-purple-300 transition-colors shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 bg-white rounded-md shadow-xs border border-gray-100 p-5 md:p-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px] shadow-md shrink-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-indigo-600 font-bold text-base md:text-lg">
                    {selectedNews.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm md:text-base">{selectedNews.author}</div>
                  <div className="text-xs md:text-sm text-gray-500">Authorized Personnel</div>
                </div>
              </div>

              <button
                onClick={() => setSelectedNews(null)}
                className="w-full md:w-auto justify-center group flex items-center gap-2 text-gray-500 hover:text-purple-600 font-medium text-sm transition-colors px-4 py-3 rounded-md hover:bg-white hover:shadow-xs border border-transparent hover:border-gray-100"
              >
                <div className="p-1 rounded-md bg-gray-100 group-hover:bg-purple-100 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
                Back to Dashboard
              </button>

            </div>
          )}

        </div>
      </div>

      {/* --- CREATE MODAL --- */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform scale-100 transition-all">

            <div className="flex justify-between items-center p-5 md:p-6 border-b border-gray-100">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Post New Update</h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-5 md:p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Headline</label>
                <input required type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm" placeholder="e.g. Holiday Notice" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Category</label>
                  <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                    <option>Academic</option>
                    <option>Exam</option>
                    <option>Campus</option>
                    <option>Admissions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Date</label>
                  <input type="date" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Details</label>
                <textarea rows={4} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm" placeholder="Write your update here..."></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="pinned" className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300" />
                <label htmlFor="pinned" className="text-sm text-gray-600 font-medium">Pin to top</label>
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 px-5 py-3 text-gray-600 font-bold hover:bg-gray-50 rounded-xl transition-colors text-sm">Cancel</button>
                <button type="submit" className="flex-1 px-5 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all transform active:scale-95 text-sm">Publish</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default NewsDashboard;