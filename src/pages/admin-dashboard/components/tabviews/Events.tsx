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
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  MoreVertical // Imported the 3-dot icon
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
  attendees: number;
  capacity: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  description: string;
}

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
    attendees: 10 + i,
    capacity: 50,
    status: statuses[i % 3],
    description: "A refreshing session focusing on wellness and breathwork."
  }));
};

const EventsDashboard: React.FC = () => {
  // --- State Management ---
  const [events, setEvents] = useState<Event[]>(generateMockEvents());
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Upcoming' | 'Completed'>('All');

  // Pagination Config
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDeleteId, setEventToDeleteId] = useState<number | null>(null);

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
    attendees: 0,
    capacity: 0,
    status: 'Upcoming',
    description: ''
  };
  const [formData, setFormData] = useState<Event>(initialFormState);

  // --- URL Management ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (view === 'detail' && selectedEvent) {
      params.set('view', 'detail');
      params.set('eventId', selectedEvent.id.toString());
    } else {
      params.delete('eventId');
      params.set('view', 'list');
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newUrl);
  }, [view, selectedEvent]);

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
    setActiveMenuId(null); // Close menu
  };

  const openDeleteModal = (id: number) => {
    setEventToDeleteId(id);
    setIsDeleteModalOpen(true);
    setActiveMenuId(null); // Close menu
  };

  const confirmDelete = () => {
    if (eventToDeleteId) {
      setEvents(events.filter(e => e.id !== eventToDeleteId));
      if (selectedEvent?.id === eventToDeleteId) {
        setView('list');
        setSelectedEvent(null);
      }
    }
    setIsDeleteModalOpen(false);
    setEventToDeleteId(null);
  };

  const openCreateModal = () => {
    setFormData({ ...initialFormState, id: Date.now() });
    setIsEditMode(false);
    setIsFormModalOpen(true);
  };

  const openEditModal = (event: Event) => {
    setFormData(event);
    setIsEditMode(true);
    setIsFormModalOpen(true);
    setActiveMenuId(null); // Close menu
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) {
      setEvents(events.map(ev => (ev.id === formData.id ? formData : ev)));
      if (selectedEvent?.id === formData.id) setSelectedEvent(formData);
    } else {
      setEvents([formData, ...events]);
    }
    setIsFormModalOpen(false);
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
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-bold text-gray-900 tracking-tight">Events Management</h3>
          <p className="text-gray-500 text-sm mt-1">Create and manage your yoga schedules.</p>
        </div>
        {view === 'list' && (
          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-md font-medium transition-all text-sm active:scale-95"
          >
            <Plus className="w-5 h-5" /> Create Event
          </button>
        )}
      </div>

      {/* --- VIEW: LIST --- */}
      {view === 'list' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-md shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              />
            </div>
          </div>

          {/* TABLE VIEW */}
          <div className="bg-white rounded-md shadow-xs"> {/* overflow-visible allows dropdown to pop out if needed, though relative positioning usually keeps it inside */}
            <div className="overflow-x-auto min-h-[400px]"> {/* Added min-h to ensure dropdowns near bottom have space if container scrolls */}
              <table className="w-full text-left text-sm min-w-[800px]">
                <thead className="bg-gray-50/50 border-b border-gray-100 text-gray-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Event Name</th>
                    {/* Changed Header from 'Date & Time' to 'Date' */}
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Location</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Attendees</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentItems.map(event => (
                    <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-xs text-purple-600 bg-purple-50 inline-block px-2 py-0.5 rounded mt-1">{event.category}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {/* ONLY showing Date now, removed Time */}
                        <div className="flex items-center gap-2">
                           <Calendar className="w-3 h-3 text-gray-400"/>
                           {event.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>{event.status}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                          <div className="text-gray-600 mb-1">{event.attendees}/{event.capacity}</div>
                          <div className="w-24 ml-auto bg-gray-100 rounded-full h-1">
                            <div className="bg-purple-500 h-1 rounded-full" style={{ width: `${(event.attendees / event.capacity) * 100}%` }}></div>
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
                            className="absolute right-12 top-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200"
                          >
                            <div className="py-1">
                              <button 
                                onClick={() => handleViewDetail(event)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4 text-gray-400" /> View
                              </button>
                              <button 
                                onClick={() => openEditModal(event)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4 text-gray-400" /> Edit
                              </button>
                              <button 
                                onClick={() => openDeleteModal(event.id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
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
          </div>

          {/* Numbered Pagination Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
             <p className="text-sm text-gray-500">
               Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredEvents.length)}</span> of <span className="font-medium">{filteredEvents.length}</span> results
             </p>
             
             <div className="flex items-center gap-2">
               <button 
                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                 disabled={currentPage === 1}
                 className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-white"
               >
                 <ChevronLeft className="w-4 h-4" />
               </button>

               <div className="flex items-center gap-1">
                 {pageNumbers.map(number => (
                   <button
                     key={number}
                     onClick={() => setCurrentPage(number)}
                     className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition-colors ${
                       currentPage === number 
                         ? 'bg-purple-600 text-white' 
                         : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                     }`}
                   >
                     {number}
                   </button>
                 ))}
               </div>

               <button 
                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                 disabled={currentPage === totalPages}
                 className="p-2 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed bg-white"
               >
                 <ChevronRight className="w-4 h-4" />
               </button>
             </div>
          </div>
        </div>
      )}

      {/* --- VIEW: DETAIL (No Changes) --- */}
      {view === 'detail' && selectedEvent && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-5xl mx-auto">
          <button onClick={() => setView('list')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to List
          </button>

          <div className="bg-white rounded-md shadow-xs">
            <div className="h-28 bg-gradient-to-r from-purple-600 to-indigo-600 p-6 sm:p-8 flex flex-col justify-end text-white">
               <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                 <div>
                   <h3 className="text-3xl font-bold">{selectedEvent.title}</h3>
                   <div className="flex flex-wrap gap-4 mt-2 text-purple-100 text-sm">
                     <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedEvent.location}</span>
                     <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedEvent.date}</span>
                   </div>
                 </div>
                 <div className="flex gap-3">
                   <button onClick={() => openEditModal(selectedEvent)} className="bg-white text-purple-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors flex items-center gap-2">
                     <Edit className="w-4 h-4" /> Edit
                   </button>
                   <button onClick={() => openDeleteModal(selectedEvent.id)} className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-medium text-sm hover:bg-white/20 transition-colors flex items-center gap-2">
                     <Trash2 className="w-4 h-4" /> Delete
                   </button>
                 </div>
               </div>
            </div>
            
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg! font-bold text-gray-900">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Time</div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2"><Clock className="w-4 h-4 text-purple-600"/> {selectedEvent.time}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">Price</div>
                  <div className="font-semibold text-gray-900 flex items-center gap-2"><DollarSign className="w-4 h-4 text-green-600"/> {selectedEvent.price}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: CREATE / EDIT --- */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{isEditMode ? 'Edit Event' : 'Create New Event'}</h3>
              <button onClick={() => setIsFormModalOpen(false)} className="p-1 text-gray-400 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <form id="eventForm" onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none">
                        <option value="Class">Class</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Retreat">Retreat</option>
                        <option value="Webinar">Webinar</option>
                      </select>
                  </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"></textarea>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
               <button onClick={() => setIsFormModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-white">Cancel</button>
               <button type="submit" form="eventForm" className="flex-1 px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700">{isEditMode ? 'Save Changes' : 'Create Event'}</button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: DELETE CONFIRMATION --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
               <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Event?</h3>
            <p className="text-gray-500 text-sm mb-6">Are you sure you want to delete this event? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EventsDashboard;