import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  MapPin,
  Plus,
  Search,
  Clock,
  DollarSign,
  ArrowLeft,
  Trash2,
  Edit,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  MoreVertical,
  Users,
  Heart,
  Save
} from 'lucide-react';

// --- 1. Types & Interfaces ---
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Workshop' | 'Retreat' | 'Class' | 'Webinar';
  price: string;
  interested: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  description: string;
}

type ViewState = 'list' | 'detail' | 'form';

// --- 2. Mock Data Generator ---
const generateMockEvents = (): Event[] => {
  const categories = ['Workshop', 'Retreat', 'Class', 'Webinar'] as const;
  const statuses = ['Upcoming', 'Completed', 'Cancelled'] as const;
  
  return Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    title: i === 0 ? "Morning Yoga Flow" : `Yoga Event Session ${i + 1}`,
    date: "2025-01-10",
    time: "07:00 AM - 08:30 AM",
    location: i % 2 === 0 ? "Main Studio, Dehradun" : "Online (Zoom)",
    category: categories[i % 4],
    price: `$${(i + 1) * 10}`,
    interested: 20 + (i * 5),
    status: statuses[i % 3],
    description: "A refreshing session focusing on wellness and breathwork."
  }));
};

const EventsDashboard: React.FC = () => {
  // --- State Management ---
  const [events, setEvents] = useState<Event[]>(generateMockEvents());
  const [view, setView] = useState<ViewState>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Upcoming' | 'Completed'>('All');

  // Pagination Config
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals (Only keeping Delete modal as a popup for safety, Form is now a page)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDeleteId, setEventToDeleteId] = useState<number | null>(null);

  // Edit Mode State for the Form Page
  const [isEditMode, setIsEditMode] = useState(false);

  // Dropdown Menu State
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Form State
  const initialFormState: Event = {
    id: 0,
    title: '',
    date: '',
    time: '',
    location: '',
    category: 'Class',
    price: '',
    interested: 0,
    status: 'Upcoming',
    description: ''
  };
  const [formData, setFormData] = useState<Event>(initialFormState);

  // --- URL Management ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const eventIdParam = params.get('eventId');

    if (viewParam === 'detail' && eventIdParam) {
      const found = events.find(e => e.id === Number(eventIdParam));
      if (found) {
        setSelectedEvent(found);
        setView('detail');
      }
    } else if (viewParam === 'form') {
       // Ideally you might handle deep linking to edit here, but for now we reset
       // if no specific logic is needed.
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (view === 'list') {
      params.delete('eventId');
      params.delete('mode');
      params.set('view', 'list');
    } else if (view === 'detail' && selectedEvent) {
      params.set('view', 'detail');
      params.set('eventId', selectedEvent.id.toString());
      params.delete('mode');
    } else if (view === 'form') {
      params.set('view', 'form');
      if (isEditMode && selectedEvent) {
        params.set('eventId', selectedEvent.id.toString());
        params.set('mode', 'edit');
      } else {
        params.set('mode', 'create');
      }
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [view, selectedEvent, isEditMode]);

  // --- Click Outside to Close Dropdown ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // --- Filter & Pagination Logic ---
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // --- Handlers ---
  const handleViewDetail = (event: Event) => {
    setSelectedEvent(event);
    setView('detail');
    setActiveMenuId(null);
  };

  const openDeleteModal = (id: number) => {
    setEventToDeleteId(id);
    setIsDeleteModalOpen(true);
    setActiveMenuId(null);
  };

  const confirmDelete = () => {
    if (eventToDeleteId) {
      setEvents(events.filter(e => e.id !== eventToDeleteId));
      // If we are deleting the event currently being viewed/edited
      if (selectedEvent?.id === eventToDeleteId) {
        setView('list');
        setSelectedEvent(null);
      }
    }
    setIsDeleteModalOpen(false);
    setEventToDeleteId(null);
  };

  // Switch to Form View for Creation
  const handleCreateClick = () => {
    setFormData({ ...initialFormState, id: Date.now() });
    setIsEditMode(false);
    setView('form');
  };

  // Switch to Form View for Editing
  const handleEditClick = (event: Event) => {
    setFormData(event);
    setIsEditMode(true);
    // Ensure selected event is set if coming from list view 3-dots
    setSelectedEvent(event);
    setActiveMenuId(null);
    setView('form');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      setEvents(events.map(ev => (ev.id === formData.id ? formData : ev)));
      // Update the selected event so detail view shows new data if we return there
      if (selectedEvent?.id === formData.id) setSelectedEvent(formData);
      // Return to detail view if we were editing
      setView('detail');
    } else {
      setEvents([formData, ...events]);
      // Return to list view after creation
      setView('list');
    }
  };

  const toggleMenu = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-purple-100 text-purple-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen text-gray-800">
      
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Events Management</h3>
          <p className="text-gray-500 text-sm mt-1">Create and manage your yoga schedules.</p>
        </div>
        {/* Only show Create button on List view */}
        {view === 'list' && (
          <button
            onClick={handleCreateClick}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all text-sm active:scale-95 shadow-sm hover:shadow-md"
          >
            <Plus className="w-5 h-5" /> Create Event
          </button>
        )}
      </div>

      {/* --- VIEW: LIST --- */}
      {view === 'list' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
              {['All', 'Upcoming', 'Completed'].map(status => (
                <button
                  key={status}
                  onClick={() => { setFilterStatus(status as any); setCurrentPage(1); }}
                  className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filterStatus === status ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* TABLE VIEW */}
          <div className="bg-white rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto min-h-[400px]">
              <table className="w-full text-left text-sm min-w-[800px]">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Event Name</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Location</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Interested</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentItems.map(event => (
                    <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-xs text-purple-600 bg-purple-50 inline-block px-2 py-0.5 rounded mt-1 font-medium">{event.category}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-2">
                           <Calendar className="w-3.5 h-3.5 text-gray-400"/>
                           {event.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {event.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>{event.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 text-gray-700 font-medium">
                            <Users className="w-4 h-4 text-purple-500" />
                            {event.interested}
                          </div>
                      </td>
                      
                      {/* --- ACTIONS COLUMN (3-Dots) --- */}
                      <td className="px-6 py-4 text-right relative">
                        <button 
                          onClick={(e) => toggleMenu(e, event.id)} 
                          className={`p-2 rounded-lg transition-colors ${activeMenuId === event.id ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-600'}`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeMenuId === event.id && (
                          <div 
                            ref={menuRef}
                            className="absolute right-12 top-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
                          >
                            <div className="py-1">
                              <button 
                                onClick={() => handleViewDetail(event)}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                              >
                                <Eye className="w-4 h-4 text-gray-400" /> View Details
                              </button>
                              <button 
                                onClick={() => handleEditClick(event)}
                                className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                              >
                                <Edit className="w-4 h-4 text-gray-400" /> Edit Event
                              </button>
                              <div className="h-px bg-gray-100 my-1"></div>
                              <button 
                                onClick={() => openDeleteModal(event.id)}
                                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" /> Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {currentItems.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">No events found matching your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-gray-100 bg-gray-50/50">
               <p className="text-sm text-gray-500">
                 Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredEvents.length)}</span> of <span className="font-medium">{filteredEvents.length}</span> results
               </p>
               
               <div className="flex items-center gap-2">
                 <button 
                   onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                   disabled={currentPage === 1}
                   className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
                 >
                   <ChevronLeft className="w-4 h-4" />
                 </button>

                 <div className="flex items-center gap-1">
                   {pageNumbers.map(number => (
                     <button
                       key={number}
                       onClick={() => setCurrentPage(number)}
                       className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-all ${
                         currentPage === number 
                           ? 'bg-purple-600 text-white shadow-md' 
                           : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                       }`}
                     >
                       {number}
                     </button>
                   ))}
                 </div>

                 <button 
                   onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                   disabled={currentPage === totalPages}
                   className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
                 >
                   <ChevronRight className="w-4 h-4" />
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* --- VIEW: FORM (Create / Edit) --- */}
      {view === 'form' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button 
            onClick={() => setView(isEditMode ? 'detail' : 'list')} // Return to list if creating, detail if editing
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium mb-6 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
            {isEditMode ? 'Cancel Edit' : 'Back to List'}
          </button>

          <div className="bg-white rounded-xl shadow-xs overflow-hidden">
             {/* Form Header */}
             <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                <h4 className="text-xl font-bold text-gray-900">{isEditMode ? 'Edit Event Details' : 'Create New Event'}</h4>
                <p className="text-gray-500 text-sm mt-1">Fill in the information below to {isEditMode ? 'update the' : 'add a new'} yoga session.</p>
             </div>

             {/* Form Body */}
             <div className="p-8">
                <form id="eventForm" onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Title Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Title</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Sunrise Yoga Flow"
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})} 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" 
                    />
                  </div>

                  {/* Grid 1: Date & Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                      <input 
                        required 
                        type="date" 
                        value={formData.date} 
                        onChange={e => setFormData({...formData, date: e.target.value})} 
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" 
                      />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                        <select 
                          value={formData.category} 
                          onChange={e => setFormData({...formData, category: e.target.value as any})} 
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all bg-white"
                        >
                          <option value="Class">Class</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Retreat">Retreat</option>
                          <option value="Webinar">Webinar</option>
                        </select>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          required 
                          type="text" 
                          placeholder="e.g. Main Studio or Online"
                          value={formData.location} 
                          onChange={e => setFormData({...formData, location: e.target.value})} 
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" 
                        />
                      </div>
                  </div>

                  {/* Grid 2: Price & Interested */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                        <input 
                          required 
                          type="text" 
                          placeholder="0.00"
                          value={formData.price.replace('$', '')} 
                          onChange={e => setFormData({...formData, price: `$${e.target.value}`})} 
                          className="w-full pl-8 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Interested Count</label>
                      <input 
                        required 
                        type="number" 
                        value={formData.interested} 
                        onChange={e => setFormData({...formData, interested: parseInt(e.target.value) || 0})} 
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all" 
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea 
                      rows={5} 
                      placeholder="Describe the event details..."
                      value={formData.description} 
                      onChange={e => setFormData({...formData, description: e.target.value})} 
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-y"
                    ></textarea>
                  </div>
                </form>
             </div>

             {/* Form Footer */}
             <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
                 <button 
                   type="button"
                   onClick={() => setView(isEditMode ? 'detail' : 'list')} 
                   className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-white hover:border-gray-400 transition-all bg-white"
                 >
                   Cancel
                 </button>
                 <button 
                   type="submit" 
                   form="eventForm" 
                   className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 shadow-sm"
                 >
                   <Save className="w-4 h-4" />
                   {isEditMode ? 'Save Changes' : 'Create Event'}
                 </button>
             </div>
          </div>
        </div>
      )}

      {/* --- VIEW: DETAIL --- */}
      {view === 'detail' && selectedEvent && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium mb-6 group transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to List
          </button>

          <div className="bg-white rounded-xl shadow-xs overflow-hidden">
            {/* Detail Header */}
            <div className="h-32 bg-gradient-to-r from-purple-700 to-indigo-700 p-6 sm:p-8 flex flex-col justify-end text-white">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                 <div>
                   <h3 className="text-3xl font-bold tracking-tight">{selectedEvent.title}</h3>
                   <div className="flex flex-wrap gap-4 mt-2 text-purple-100 text-sm">
                     <span className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded"><MapPin className="w-3.5 h-3.5" /> {selectedEvent.location}</span>
                     <span className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded"><Calendar className="w-3.5 h-3.5" /> {selectedEvent.date}</span>
                   </div>
                 </div>
                 <div className="flex gap-3">
                   <button 
                     onClick={() => handleEditClick(selectedEvent)} 
                     className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                   >
                     <Edit className="w-4 h-4" /> Edit
                   </button>
                   <button 
                     onClick={() => openDeleteModal(selectedEvent.id)} 
                     className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/20 transition-colors flex items-center gap-2 backdrop-blur-sm"
                   >
                     <Trash2 className="w-4 h-4" /> Delete
                   </button>
                 </div>
               </div>
            </div>
            
            {/* Detail Body */}
            <div className="p-6 sm:p-8 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">About this Event</h3>
                <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex flex-col">
                  <div className="text-sm text-gray-500 mb-1 font-medium">Time</div>
                  <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600"/> {selectedEvent.time}
                  </div>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex flex-col">
                  <div className="text-sm text-gray-500 mb-1 font-medium">Price</div>
                  <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600"/> {selectedEvent.price}
                  </div>
                </div>
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 flex flex-col">
                  <div className="text-sm text-gray-500 mb-1 font-medium">Interest</div>
                  <div className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500"/> {selectedEvent.interested} People
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: DELETE CONFIRMATION (Still implemented as modal for safety/UX) --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-6 text-center border border-gray-100">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 border border-red-100">
               <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Event?</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsDeleteModalOpen(false)} 
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EventsDashboard;