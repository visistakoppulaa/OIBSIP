import React, { useState } from 'react';
import { TributeFigure, TimelineEvent } from '../types';
import { 
  Clock, 
  Filter, 
  LayoutGrid, 
  ListOrdered, 
  MapPin, 
  Star, 
  Award, 
  Sparkles, 
  Search,
  ChevronRight,
  Info
} from 'lucide-react';

interface TimelineSectionProps {
  figure: TributeFigure;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ figure }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'cards' | 'ordered-list'>('cards');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const categories = ['All', 'Early Life', 'Breakthrough', 'Leadership & Service', 'Awards & Honors', 'Legacy'];

  const filteredTimeline = figure.timeline.filter((event) => {
    const matchesCategory = activeCategory === 'All' || event.category === activeCategory;
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.year.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="timeline" 
      className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0F1115] text-[#E0E0E0] border-t border-b border-[#23262D]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#23262D]">
          <div>
            <div className="flex items-center gap-2 text-xs font-tech-mono uppercase tracking-widest text-[#E2FF44] font-bold mb-2">
              <Clock className="w-4 h-4 text-[#E2FF44]" />
              <span>Chronological_Milestones</span>
              <span className="px-2 py-0.5 bg-[#16191F] text-[#E2FF44] border border-[#23262D] text-[10px] font-bold">
                Protocol #4 Sourced
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sans-body font-black text-white tracking-tight">
              Timeline & Major Achievements
            </h2>
          </div>

          {/* View Mode & Search Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Search Input */}
            <div className="relative font-mono">
              <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search year or event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-[#16191F] border border-[#23262D] text-xs text-white focus:outline-none focus:border-[#E2FF44] w-44 sm:w-56"
              />
            </div>

            {/* View Mode Toggle: Cards vs Ordered List */}
            <div className="flex items-center bg-[#16191F] p-1 border border-[#23262D] font-mono">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 text-xs font-bold flex items-center gap-1.5 transition ${
                  viewMode === 'cards' ? 'bg-[#E2FF44] text-[#0F1115]' : 'text-[#A1A1AA] hover:text-white'
                }`}
                title="Cards Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('ordered-list')}
                className={`p-2 text-xs font-bold flex items-center gap-1.5 transition ${
                  viewMode === 'ordered-list' ? 'bg-[#E2FF44] text-[#0F1115]' : 'text-[#A1A1AA] hover:text-white'
                }`}
                title="Ordered List View"
              >
                <ListOrdered className="w-4 h-4" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>

          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-6 font-mono text-xs uppercase tracking-wider">
          <Filter className="w-4 h-4 text-[#A1A1AA] flex-shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 whitespace-nowrap transition-all border ${
                activeCategory === cat
                  ? 'bg-[#E2FF44] text-[#0F1115] border-[#E2FF44] font-bold'
                  : 'bg-[#16191F] text-[#A1A1AA] border-[#23262D] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards View Mode */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredTimeline.map((event, idx) => (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group relative p-6 bg-[#16191F] border border-[#23262D] hover:border-[#E2FF44] transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#0F1115] text-[#E2FF44] border border-[#23262D] text-xs font-tech-mono font-bold">
                      {event.year}
                    </span>
                    <span className="text-[10px] font-tech-mono uppercase text-[#A1A1AA] tracking-wider">
                      {event.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-sans-body font-bold text-white group-hover:text-[#E2FF44] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-xs text-[#E0E0E0] mt-2 font-sans-body leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#23262D] flex items-center justify-between text-xs text-[#A1A1AA]">
                  {event.location && (
                    <span className="flex items-center gap-1 font-tech-mono text-[11px]">
                      <MapPin className="w-3 h-3 text-[#E2FF44]" />
                      {event.location}
                    </span>
                  )}

                  <span className="text-[#E2FF44] text-xs font-mono font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform ml-auto">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Ordered List View Mode (Explicit HTML Ordered List) */
          <ol className="space-y-4 pt-4 list-decimal list-inside text-white font-mono text-xs">
            {filteredTimeline.map((event, idx) => (
              <li 
                key={event.id}
                className="p-5 bg-[#16191F] border border-[#23262D] hover:border-[#E2FF44] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-tech-mono text-[#E2FF44] font-bold text-sm">[{event.year}]</span>
                    <span className="font-sans-body font-bold text-white text-base">{event.title}</span>
                  </div>
                  <p className="text-xs text-[#E0E0E0] font-sans-body leading-relaxed pl-2 sm:pl-0">
                    {event.description}
                  </p>
                </div>
                
                <span className="px-2.5 py-1 bg-[#0F1115] text-[#A1A1AA] border border-[#23262D] text-[10px] font-tech-mono whitespace-nowrap self-start sm:self-center uppercase">
                  {event.category}
                </span>
              </li>
            ))}
          </ol>
        )}

      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1115]/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-lg w-full bg-[#16191F] border border-[#23262D] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#23262D] pb-3">
              <span className="px-3 py-1 bg-[#0F1115] text-[#E2FF44] border border-[#23262D] font-tech-mono font-bold text-xs">
                Year {selectedEvent.year}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-[#A1A1AA] hover:text-white p-1 bg-[#0F1115] border border-[#23262D]"
              >
                ✕
              </button>
            </div>

            <h3 className="text-xl font-sans-body font-bold text-white">{selectedEvent.title}</h3>
            <p className="text-sm text-[#E0E0E0] font-sans-body leading-relaxed">{selectedEvent.description}</p>

            <div className="pt-4 border-t border-[#23262D] flex justify-between items-center text-xs text-[#A1A1AA] font-tech-mono uppercase">
              <span>Category: {selectedEvent.category}</span>
              {selectedEvent.location && <span>Location: {selectedEvent.location}</span>}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
