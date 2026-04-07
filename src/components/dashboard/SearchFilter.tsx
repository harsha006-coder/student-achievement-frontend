import { Search, Filter } from "lucide-react";

interface SearchFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  filter: string;
  onFilterChange: (val: string) => void;
  filterOptions: string[];
}

const SearchFilter = ({ search, onSearchChange, filter, onFilterChange, filterOptions }: SearchFilterProps) => (
  <div className="flex flex-col sm:flex-row gap-3 mb-6">
    <div className="relative flex-1 group">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search achievements..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all text-sm placeholder:text-gray-400"
      />
    </div>
    {filterOptions.length > 0 && (
      <div className="relative">
        <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 transition-all text-sm appearance-none cursor-pointer min-w-[160px]"
        >
          <option value="">All Categories</option>
          {filterOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    )}
  </div>
);

export default SearchFilter;
