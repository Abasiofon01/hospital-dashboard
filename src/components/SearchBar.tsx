import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  placeholder?: string;
  className?: string;
  onSearchChange: (query: string) => void;
}

const SearchBar = ({
  searchQuery,
  onSearchChange,
  placeholder,
  className,
}: SearchBarProps) => {
  return (
    <div className={`flex-1 relative ${className || ""}`}>
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-[#656565]"
        size={18}
      />
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-gray-900 border-gray-200 dark:bg-[#1F1F1F] dark:text-[#656565] dark:border-transparent dark:focus:ring-gray-500 border focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
    </div>
  );
};

export default SearchBar;
