import { EllipsisVertical } from "lucide-react";
import type { Hospital, DropdownAction } from "../types";
import EmptyState from "./EmptyState";
import { useState, useRef, useEffect } from "react";

interface HospitalTableProps {
  hospitals: Hospital[];
  onHospitalClick?: (hospital: Hospital) => void;
  isEmptySearchResult?: boolean;
  emptyStateMessage?: string;
  dropdownActions?: DropdownAction[];
}

const displayValue = <T extends string | number | null | undefined>(
  value: T
): string => {
  if (value === null || value === undefined || value === "") return "None";
  return String(value);
};

const HospitalTable = ({
  hospitals,
  onHospitalClick,
  isEmptySearchResult = false,
  emptyStateMessage = "",
  dropdownActions = [],
}: HospitalTableProps) => {
  return (
    <div className="rounded-b-lg overflow-x-auto bg-white dark:bg-[#111111] shadow">
      <table className="w-full">
        <thead className="border-b border-r border-l bg-gray-50 border-gray-200 dark:bg-[#111111] dark:border-[#2A2A2A]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 capitalize tracking-wider">
              Hospital Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 capitalize tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 capitalize tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 capitalize tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 capitalize tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 capitalize tracking-wider">
              State
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 capitalize tracking-wider">
              Action
            </th>
          </tr>
        </thead>

        {hospitals.length > 0 && (
          <tbody className="divide-y divide-gray-200 dark:divide-[#2A2A2A]">
            {hospitals.map((hospital) => (
              <TableRow
                key={hospital.id}
                hospital={hospital}
                dropdownActions={dropdownActions}
                onHospitalClick={onHospitalClick}
              />
            ))}
          </tbody>
        )}
      </table>

      {hospitals.length === 0 && (
        <EmptyState
          isSearchResult={isEmptySearchResult}
          message={emptyStateMessage}
        />
      )}
    </div>
  );
};

interface TableRowProps {
  hospital: Hospital;
  dropdownActions: DropdownAction[];
  onHospitalClick?: (hospital: Hospital) => void;
}

const TableRow = ({
  hospital,
  dropdownActions,
  onHospitalClick,
}: TableRowProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleActionClick = (action: DropdownAction) => {
    action.onClick(hospital);
    setIsDropdownOpen(false);
  };

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-[#3A3A3A] transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
        <span
          onClick={() => onHospitalClick && onHospitalClick(hospital)}
          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 hover:underline transition-colors text-left cursor-pointer"
          aria-label={`View details for ${hospital.hospitalName}`}
        >
          {hospital.hospitalName}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {displayValue(hospital.hospitalEmail)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {displayValue(hospital.phoneNumber)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {displayValue(hospital.address)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {displayValue(hospital.country)}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
        {displayValue(hospital.state)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm relative">
        {dropdownActions.length > 0 ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
              aria-label="Actions"
            >
              <EllipsisVertical />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#2A2A2A] rounded-md shadow-lg border border-gray-200 dark:border-none z-10">
                <div className="py-1">
                  {dropdownActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleActionClick(action)}
                      className={`w-full text-left px-4 py-2 cursor-pointer text-sm flex items-center gap-2 ${
                        action.variant === "destructive"
                          ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#3A3A3A]"
                      }`}
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : onHospitalClick ? (
          <button
            onClick={() => onHospitalClick(hospital)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-400"
          >
            <EllipsisVertical />
          </button>
        ) : null}
      </td>
    </tr>
  );
};

export default HospitalTable;
