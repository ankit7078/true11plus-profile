import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Eye, 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  Calendar, 
  Clock,
  AlertCircle,
  X,
  Image as ImageIcon,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- Types ---
type BlogStatus = 'Published' | 'Draft' | 'Archived';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string; 
  category: string;
  status: BlogStatus;
  date: string;
  readTime: string;
  views: number;
  comments: number;
  coverImage: string; 
  authorImage?: string; 
}

// --- Mock Data Generator (20 Items) ---
const generateMockData = (): BlogPost[] => {
  const categories = ['Technology', 'Mentorship', 'Scholarship', 'Campus Life', 'Career Tips'];
  const statuses: BlogStatus[] = ['Published', 'Draft', 'Archived'];
  const authors = [
    { name: 'Dr. Sarah Miller', role: 'EdTech Researcher' },
    { name: 'John Doe', role: 'Senior Mentor' },
    { name: 'Admin Team', role: 'University Board' },
    { name: 'Emily Chen', role: 'Student Ambassador' },
    { name: 'Michael Ross', role: 'Career Counselor' }
  ];

  return Array.from({ length: 20 }, (_, i) => {
    const id = i + 1;
    const author = authors[i % authors.length];
    return {
      id,
      title: [
        "The Future of AI in Education",
        "10 Tips for Effective Remote Mentoring",
        "Upcoming Scholarship Deadlines 2025",
        "How to Balance Campus Life and Study",
        "Career Paths in Data Science",
        "The Importance of Mental Health",
        "Study Abroad Opportunities",
        "Mastering the Art of Networking",
        "Building a Strong Portfolio",
        "The Rise of Green Technology",
        "Understanding Financial Aid",
        "Top 5 Coding Bootcamps Reviewed",
        "Leadership Skills for Students",
        "The Evolution of Online Learning",
        "Preparing for Your First Interview",
        "Sustainable Living on Campus",
        "The Power of Alumni Networks",
        "Navigating Graduate School Applications",
        "Soft Skills Employers Want",
        "Innovation in the Classroom"
      ][i] || `Blog Post Title ${id}`,
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      content: "This is the full content of the blog post. It contains detailed information about the topic...",
      author: author.name,
      authorRole: author.role,
      category: categories[i % categories.length],
      status: statuses[i % statuses.length],
      date: new Date(2024, 9, 24 - i).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: `${3 + (i % 7)} min read`,
      views: Math.floor(Math.random() * 2000) + 100,
      comments: Math.floor(Math.random() * 50),
      coverImage: `https://images.unsplash.com/photo-${[
        '1509062522246-3755977927d7', '1516321318423-f06f85e504b3', '1523050854058-8df90110c9f1', 
        '1522202176988-66273c2fd55f', '1517245386807-bb43f82c33c4', '1513258496099-48168024aec0',
        '1509062522246-3755977927d7', '1516321318423-f06f85e504b3', '1523050854058-8df90110c9f1',
        '1522202176988-66273c2fd55f', '1517245386807-bb43f82c33c4', '1513258496099-48168024aec0',
        '1509062522246-3755977927d7', '1516321318423-f06f85e504b3', '1523050854058-8df90110c9f1',
        '1522202176988-66273c2fd55f', '1517245386807-bb43f82c33c4', '1513258496099-48168024aec0',
        '1509062522246-3755977927d7', '1516321318423-f06f85e504b3'
      ][i]}?auto=format&fit=crop&q=80&w=1000`,
      authorImage: `https://images.unsplash.com/photo-${[
        '1494790108377-be9c29b29330', '1472099645785-5658abf4ff4e', '1519085360753-af0119f7cbe7',
        '1580489944761-15a19d654956', '1535713875002-d1d0cf377fde'
      ][i % 5]}?auto=format&fit=crop&q=80&w=150`
    };
  });
};

const initialBlogs = generateMockData();
const ITEMS_PER_PAGE = 5;

const BlogDashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1);

  // --- Create/Edit Modal State ---
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null); 

  const [newPost, setNewPost] = useState({
    title: '',
    category: 'Technology',
    author: 'Admin User',
    content: '',
    coverImage: '',
    status: 'Published' as BlogStatus
  });

  // --- Delete Modal State ---
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // --- URL & Routing Logic ---
  
  // 1. Sync State from URL on Mount & History Change
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      
      // Handle Detail View
      const postId = params.get('post');
      if (postId) {
        const found = blogs.find(b => b.id === Number(postId));
        if (found) setSelectedBlog(found);
      } else {
        setSelectedBlog(null);
      }

      // Handle Pagination
      const pageParam = params.get('page');
      const page = pageParam ? parseInt(pageParam) : 1;
      setCurrentPage(page > 0 ? page : 1);
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [blogs]); 

  // 2. Navigation Handlers
  const handleViewBlog = (blog: BlogPost) => {
    const url = new URL(window.location.href);
    url.searchParams.set('post', blog.id.toString());
    // Keep page param if exists
    window.history.pushState({}, '', url);
    setSelectedBlog(blog);
  };

  const handleBackToDashboard = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('post');
    window.history.pushState({}, '', url);
    setSelectedBlog(null);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    setCurrentPage(newPage);
    
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('page', newPage.toString());
    window.history.pushState({}, '', url);

    // Scroll to top of table
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Filtering & Pagination Logic ---
  
  // Filter logic
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || blog.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Reset pagination when filter changes
  useEffect(() => {
    if (currentPage !== 1) {
       // Only reset visual state, URL update happens in handlePageChange if we called it directly
       // But here we might want to keep it simple or user might get lost on empty page
       // For this example, we won't force URL reset on filter type to allow better UX, 
       // but we will ensure CurrentPage isn't out of bounds in render logic.
       setCurrentPage(1); 
       const url = new URL(window.location.href);
       url.searchParams.set('page', '1');
       window.history.replaceState({}, '', url);
    }
  }, [searchQuery, filterStatus]);

  // Calculate Pagination Slices
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  // --- Actions ---

  const requestDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setBlogs(blogs.filter(b => b.id !== deleteId));
      if (selectedBlog && selectedBlog.id === deleteId) {
        handleBackToDashboard();
      }
      setDeleteId(null);
    }
  };

  const handleEditClick = (blog: BlogPost) => {
    setEditingId(blog.id);
    setNewPost({
      title: blog.title,
      category: blog.category,
      author: blog.author,
      content: blog.content,
      coverImage: blog.coverImage,
      status: blog.status
    });
    setIsCreateModalOpen(true);
  };

  const handleCreateClick = () => {
    setEditingId(null);
    setNewPost({
      title: '',
      category: 'Technology',
      author: 'Admin User',
      content: '',
      coverImage: '',
      status: 'Published' as BlogStatus
    });
    setIsCreateModalOpen(true);
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update existing
    if (editingId !== null) {
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === editingId) {
          return {
            ...blog,
            title: newPost.title,
            excerpt: newPost.content.substring(0, 100) + "...",
            content: newPost.content,
            author: newPost.author,
            category: newPost.category,
            status: newPost.status,
            readTime: Math.ceil(newPost.content.split(' ').length / 200) + " min read",
            coverImage: newPost.coverImage || blog.coverImage
          };
        }
        return blog;
      });
      
      setBlogs(updatedBlogs);
      
      if (selectedBlog && selectedBlog.id === editingId) {
        const updatedSelected = updatedBlogs.find(b => b.id === editingId);
        if (updatedSelected) setSelectedBlog(updatedSelected);
      }

    } else {
      // Create New
      const newId = Date.now();
      const createdBlog: BlogPost = {
        id: newId, 
        title: newPost.title,
        excerpt: newPost.content.substring(0, 100) + "...", 
        content: newPost.content,
        author: newPost.author,
        authorRole: "Contributor", 
        category: newPost.category,
        status: newPost.status,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: Math.ceil(newPost.content.split(' ').length / 200) + " min read", 
        views: 0,
        comments: 0,
        coverImage: newPost.coverImage || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000", 
        authorImage: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=150" 
      };
      setBlogs([createdBlog, ...blogs]);
    }

    setIsCreateModalOpen(false); 
    setEditingId(null);
  };

  const getStatusStyle = (status: BlogStatus) => {
    switch (status) {
      case 'Published': return 'bg-emerald-50 text-emerald-700 border border-emerald-100';
      case 'Draft': return 'bg-amber-50 text-amber-700 border border-amber-100';
      case 'Archived': return 'bg-gray-50 text-gray-600 border border-gray-100';
    }
  };

  // --- REUSABLE COMPONENTS ---
  
  // 1. Delete Modal
  const DeleteModal = () => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 transform scale-100 transition-all">
            <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600">
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Post?</h3>
                <p className="text-slate-500 text-sm mb-6">
                    Are you sure you want to delete this blog post? This action cannot be undone.
                </p>
                <div className="flex gap-3 w-full">
                    <button 
                        onClick={() => setDeleteId(null)}
                        className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={confirmDelete}
                        className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 shadow-lg shadow-red-200 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
  );

  // 2. Create/Edit Modal
  const CreateEditModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar transform scale-100 transition-all">
        
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h4 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Post' : 'Create New Post'}</h4>
          <button onClick={() => setIsCreateModalOpen(false)} className="p-2 text-slate-400 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleCreateSubmit} className="p-4 md:p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
              <input 
                required 
                type="text" 
                value={newPost.title}
                onChange={e => setNewPost({...newPost, title: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all text-sm md:text-base" 
                placeholder="e.g. The Future of Learning" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
              <select 
                value={newPost.category}
                onChange={e => setNewPost({...newPost, category: e.target.value})}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none text-sm md:text-base"
              >
                <option>Technology</option>
                <option>Mentorship</option>
                <option>Scholarship</option>
                <option>Campus Life</option>
                <option>Career Tips</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Author Name</label>
               <input 
                  type="text" 
                  value={newPost.author}
                  onChange={e => setNewPost({...newPost, author: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none text-sm md:text-base" 
               />
            </div>
            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Status</label>
               <select 
                  value={newPost.status}
                  onChange={e => setNewPost({...newPost, status: e.target.value as BlogStatus})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none text-sm md:text-base"
               >
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
               </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image URL</label>
            <div className="flex gap-2">
               <div className="flex-1 relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="url" 
                    value={newPost.coverImage}
                    onChange={e => setNewPost({...newPost, coverImage: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none text-sm md:text-base" 
                    placeholder="https://example.com/image.jpg" 
                  />
               </div>
            </div>
            <p className="text-xs text-slate-400 mt-1">Leave empty to use a random default image.</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Content</label>
            <textarea 
              required
              rows={6} 
              value={newPost.content}
              onChange={e => setNewPost({...newPost, content: e.target.value})}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none resize-y no-scrollbar text-sm md:text-base" 
              placeholder="Write your blog content here..."
            ></textarea>
          </div>

          <div className="pt-4 flex gap-3 border-t border-gray-100">
              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 px-5 py-2 text-slate-600 font-bold hover:bg-slate-50 border border-gray-200 rounded-md transition-colors">Cancel</button>
              <button type="submit" className="flex-1 px-5 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 shadow-xs transition-all transform active:scale-95">
                {editingId ? 'Update Post' : 'Publish Post'}
              </button>
          </div>
        </form>
      </div>
    </div>
  );

  // --- VIEW: DETAIL PAGE ---
  if (selectedBlog) {
    return (
      <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-500 relative pb-12">
        {deleteId && <DeleteModal />}
        {isCreateModalOpen && <CreateEditModal />}

        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-40 py-2 -mx-2 px-2 md:static md:bg-transparent md:py-0">
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-slate-600 hover:text-purple-600 hover:bg-white p-2 rounded-md font-medium transition-colors group"
          >
             <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Blog</span>
          </button>

          <div className="flex items-center gap-2 md:gap-3">
             <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider ${getStatusStyle(selectedBlog.status)}`}>
               {selectedBlog.status}
             </span>    
             <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>
             
             <button 
               onClick={() => handleEditClick(selectedBlog)}
               className="p-2 sm:px-3 flex items-center gap-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all font-medium border border-transparent hover:border-purple-100"
             >
               <Edit3 className="w-4 h-4" /> <span className="hidden sm:inline">Edit</span>
             </button>

             <button 
                onClick={() => requestDelete(selectedBlog.id)}
                className="p-2 sm:px-4 flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all font-medium border border-transparent hover:border-red-100"
             >
               <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">Delete</span>
             </button>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full h-64 md:h-[400px] group overflow-hidden mt-4 md:mt-6 rounded-md shadow-sm">
          <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/20 transition-colors duration-700 z-10"></div>
          <img 
            src={selectedBlog.coverImage} 
            alt={selectedBlog.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
          />
          
          {/* Hero Content Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-4 md:p-12 z-20 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block px-3 py-1 mb-2 md:mb-4 rounded-md bg-purple-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg">
                {selectedBlog.category}
              </span>
              <h1 className="text-xl md:text-4xl font-extrabold text-white leading-tight mb-2 md:mb-4 shadow-sm drop-shadow-md">
                {selectedBlog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90 text-[10px] md:text-xs">
                <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {selectedBlog.date}</span>
                <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {selectedBlog.readTime}</span>
                <span className="flex items-center gap-2"><Eye className="w-3 h-3" /> {selectedBlog.views.toLocaleString()} views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout: Content + Sidebar */}
        <div className="pt-6 md:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="prose prose-slate prose-lg max-w-none">
                <p className="lead text-lg md:text-2xl text-slate-600 font-serif italic mb-6 md:mb-8 border-l-4 border-purple-500 pl-4">
                  "{selectedBlog.excerpt}"
                </p>
                <div className="text-slate-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                  {selectedBlog.content}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8 order-1 lg:order-2">
              <div className="bg-white p-4 md:p-6 rounded-md shadow-xs lg:sticky lg:top-24 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">About the Author</h4>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={selectedBlog.authorImage} 
                    alt={selectedBlog.author} 
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-purple-100 shadow-sm"
                  />
                  <div>
                    <div className="font-bold text-slate-900 text-base md:text-lg">{selectedBlog.author}</div>
                    <div className="text-purple-600 text-xs md:text-sm font-medium">{selectedBlog.authorRole}</div>
                  </div>
                </div>
                <button className="w-full py-2.5 rounded-xl border border-purple-200 text-purple-700 font-semibold hover:bg-purple-50 transition-colors text-sm">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW 1: DASHBOARD TABLE ---
  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      
      {deleteId && <DeleteModal />}
      {isCreateModalOpen && <CreateEditModal />}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-slate-900">Blog Management</h3>
          <p className="text-slate-500 text-sm md:text-base mt-1">Manage, edit, and publish your educational content.</p>
        </div>
        <button 
          onClick={handleCreateClick}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-md font-medium shadow-xs shadow-purple-200 transition-all active:scale-95 text-sm w-full md:w-auto"
        >
           <Plus className="w-4 h-4" /> Create New Post
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-md shadow-xs">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by title or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-sm"
            />
         </div>
         <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'Published', 'Draft'].map(status => (
               <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                     filterStatus === status 
                     ? 'bg-purple-600 text-white' 
                     : 'bg-purple-50 text-purple-600 hover:bg-purple-100'
                  }`}
               >
                  {status}
               </button>
            ))}
         </div>
      </div>

      {/* Blog Table */}
      <div className="bg-white rounded-md shadow-xs border border-slate-100">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="px-4 py-4">Article Details</th>
                <th className="px-4 py-4">Author</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length > 0 ? (
                currentItems.map(blog => (
                  <tr 
                    key={blog.id} 
                    className="group hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => handleViewBlog(blog)} 
                  >
                    <td className="px-4 py-4 max-w-sm">
                      <div className="flex gap-4">
                          <img src={blog.coverImage} alt="" className="w-16 h-12 object-cover rounded-lg border border-slate-200 shrink-0" />
                          <div>
                             <h3 className="font-bold text-slate-900 !text-sm mb-1 group-hover:text-purple-600 transition-colors line-clamp-1">{blog.title}</h3>
                             <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-400">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime}</span>
                             </div>
                          </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                           <img src={blog.authorImage} alt="" className="w-8 h-8 rounded-full border border-slate-200 shrink-0" />
                           <div className="text-sm">
                              <div className="font-semibold text-slate-700 whitespace-nowrap">{blog.author}</div>
                              <div className="text-xs text-slate-400 whitespace-nowrap">{blog.authorRole}</div>
                           </div>
                        </div>
                    </td>
                    <td className="px-4 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 whitespace-nowrap">
                           {blog.category}
                        </span>
                    </td>
                  
                    <td className="px-4 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getStatusStyle(blog.status)}`}>
                           {blog.status}
                        </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                        <button className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
                           <Eye className="w-4 h-4" />
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center">
                          <AlertCircle className="w-10 h-10 mb-2 text-slate-300" />
                          <p>No blog posts found.</p>
                      </div>
                   </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {filteredBlogs.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-slate-100 gap-4">
            <div className="text-sm text-slate-500 order-2 sm:order-1">
              Showing <span className="font-bold text-slate-700">{indexOfFirstItem + 1}</span> to <span className="font-bold text-slate-700">{Math.min(indexOfLastItem, filteredBlogs.length)}</span> of <span className="font-bold text-slate-700">{filteredBlogs.length}</span> entries
            </div>
            
            <div className="flex gap-2 order-1 sm:order-2">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 border border-slate-200 rounded-md text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                 <button
                   key={page}
                   onClick={() => handlePageChange(page)}
                   className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                     currentPage === page 
                      ? 'bg-purple-600 text-white shadow-xs' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                   }`}
                 >
                   {page}
                 </button>
              ))}

              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 border border-slate-200 rounded-md text-slate-500 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDashboard;