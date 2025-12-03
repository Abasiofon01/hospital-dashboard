import { SearchSlash, Database, AlertCircle } from "lucide-react";

interface EmptyStateProps {
  isSearchResult?: boolean;
  message?: string;
}

const EmptyState = ({ isSearchResult = false, message }: EmptyStateProps) => {
  const defaultMessages = {
    noData: "No hospitals available. Data will appear here once loaded.",
    search: "No hospitals found matching your search criteria.",
    filter: "No hospitals found for the selected filters.",
  };

  const getIcon = () => {
    if (isSearchResult) return <SearchSlash size={48} />;
    return <Database size={48} />;
  };

  const getTitle = () => {
    if (isSearchResult) return "No results found";
    return "No data available";
  };

  const getDescription = () => {
    if (message) return message;
    if (isSearchResult) return defaultMessages.search;
    return defaultMessages.noData;
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-gray-500 dark:text-gray-300">
      <div className="mb-4 p-4 rounded-full bg-gray-100 dark:bg-gray-800">
        {getIcon()}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {getTitle()}
      </h3>
      <p className="text-center max-w-md mb-6">{getDescription()}</p>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p className="flex items-center gap-2">
          <AlertCircle size={16} />
          Try adjusting your search or filters
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
