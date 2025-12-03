import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  className?: string;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  className,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const getPageNumbers = (mobile = false) => {
    const pageNumbers = [];
    const maxVisiblePages = mobile ? 2 : 5;

    if (mobile && totalPages > 2) {
      pageNumbers.push(1);
      pageNumbers.push(2);
      if (totalPages > 3) {
        pageNumbers.push("...");
      }
      if (totalPages > 2) {
        pageNumbers.push(totalPages);
      }
      return pageNumbers;
    }

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        end = Math.min(totalPages - 1, maxVisiblePages - 1);
      }

      if (currentPage >= totalPages - 1) {
        start = Math.max(2, totalPages - maxVisiblePages + 2);
      }

      if (start > 2) {
        pageNumbers.push("...");
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbersMobile = getPageNumbers(true);
  const pageNumbersDesktop = getPageNumbers(false);

  const baseButtonClasses = "p-2 rounded border transition-colors duration-200";
  const baseItemClasses =
    "px-3.5 py-1.5 rounded border transition-colors duration-200";

  const defaultClasses =
    "bg-white text-gray-900 hover:bg-gray-100 border-gray-200 dark:bg-transparent dark:text-white dark:border-transparent dark:hover:border-white dark:hover:bg-transparent";

  const disabledClasses =
    "opacity-50 cursor-not-allowed border-gray-200 dark:bg-transparent dark:text-white dark:border-transparent dark:hover:border-white dark:hover:bg-transparent";
  const activeClasses =
    "text-black border-gray-400 dark:text-white dark:border-white";
  const ellipsisClasses = "px-3 py-2 text-gray-500 dark:text-gray-400";

  return (
    <div
      className={`mt-7 flex items-center flex-col-reverse gap-4 sm:flex-row sm:gap-13 justify-end ${
        className || ""
      }`}
    >
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`${baseButtonClasses} ${
            currentPage === 1 ? disabledClasses : defaultClasses
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-1 sm:hidden">
          {pageNumbersMobile.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className={ellipsisClasses}>
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`${baseItemClasses} ${
                  currentPage === page ? activeClasses : defaultClasses
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-1">
          {pageNumbersDesktop.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className={ellipsisClasses}>
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`${baseItemClasses} ${
                  currentPage === page ? activeClasses : defaultClasses
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`${baseButtonClasses} ${
            currentPage === totalPages || totalPages === 0
              ? disabledClasses
              : defaultClasses
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-3 py-1 rounded border bg-white text-gray-900 border-gray-200 dark:bg-[#111111] dark:text-white dark:border-[#2A2A2A] "
        >
          <option value={10}>10/page</option>
          <option value={20}>20/page</option>
          <option value={30}>30/page</option>
          <option value={40}>40/page</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
