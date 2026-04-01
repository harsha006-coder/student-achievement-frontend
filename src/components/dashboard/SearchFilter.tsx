import { Search } from "lucide-react";

interface SearchFilterProps {
  search: string;
  onSearchChange: (val: string) => void;
  filter: string;
  onFilterChange: (val: string) => void;
  filterOptions: string[];
}

const SearchFilter = ({ search, onSearchChange, filter, onFilterChange, filterOptions }: SearchFilterProps) => (
  <div className="flex flex-col sm:flex-row gap-3 mb-6">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
      />
    </div>
    <select
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
      className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition text-sm"
    >
      <option value="">All Categories</option>
      {filterOptions.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default SearchFilter;
