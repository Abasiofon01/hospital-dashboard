import { X, Filter } from "lucide-react";
import { useState } from "react";
import type { HospitalFilters } from "../types";
import SearchBar from "./SearchBar";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: HospitalFilters;
  onApplyFilters: (filters: HospitalFilters) => void;
  countries: Array<{ id: number; name: string }>;
}

const FilterModal = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  countries,
}: FilterModalProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [countrySearchQuery, setCountrySearchQuery] = useState("");

  const getSelectedCountryName = () => {
    const selected = countries.find(
      (c) => c.id.toString() === localFilters.selectedCountry
    );
    return selected ? selected.name : "";
  };

  const handleCountryChange = (countryId: string) => {
    setLocalFilters({
      ...localFilters,
      selectedCountry: countryId,
    });
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      searchQuery: "",
      selectedCountry: "166",
      selectedState: "",
      hospitalType: "",
    };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const filteredCountries = countrySearchQuery
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(countrySearchQuery.toLowerCase())
      )
    : countries;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black opacity-40 transition-opacity duration-300 ease-in-out"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-6 flex max-w-full pl-10">
        <div className="relative w-screen max-w-[552px] bg-white dark:bg-[#1B1B1B]">
          <div className="absolute right-0 top-0 flex pr-2 pt-4 sm:pr-4">
            <button
              onClick={onClose}
              className="rounded-md p-1 transition-colors border duration-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex h-full flex-col overflow-y-auto bg-white text-gray-900 dark:bg-[#1B1B1B] dark:text-white py-6 shadow-xl">
            <div className="px-6">
              <div className="flex items-center gap-2">
                <Filter className="h-6 w-6" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Filter Hospitals
                </h2>
              </div>
              <div className="mt-8 space-y-6">
                <SearchBar
                  searchQuery={localFilters.searchQuery}
                  onSearchChange={(value: string) =>
                    setLocalFilters({
                      ...localFilters,
                      searchQuery: value,
                    })
                  }
                  placeholder="Search by hospital name"
                />

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                    Country
                  </label>

                  <div className="mb-3">
                    <SearchBar
                      searchQuery={countrySearchQuery}
                      onSearchChange={setCountrySearchQuery}
                      placeholder="Search countries..."
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto border border-black/20 dark:border-white/10 rounded-sm p-2">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <label
                          key={country.id}
                          className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="country"
                            value={country.id.toString()}
                            checked={
                              localFilters.selectedCountry ===
                              country.id.toString()
                            }
                            onChange={(e) =>
                              handleCountryChange(e.target.value)
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                          />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {country.name}
                          </span>
                        </label>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
                {/* <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                    State / Region
                  </label>
                  <input
                    type="text"
                    value={localFilters.selectedState}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        selectedState: e.target.value,
                      })
                    }
                    placeholder="Enter state or region..."
                    className="w-full px-3 py-2 rounded-sm border bg-white text-gray-900 border-black/20 dark:bg-black dark:text-white dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div> */}
                {/* <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                    Hospital Type
                  </label>
                  <select
                    value={localFilters.hospitalType}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        hospitalType: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-sm border bg-white text-gray-900 border-black/20 dark:bg-black dark:text-white dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="general">General Hospital</option>
                    <option value="specialty">Specialty Hospital</option>
                    <option value="teaching">Teaching Hospital</option>
                    <option value="community">Community Hospital</option>
                    <option value="private">Private Hospital</option>
                    <option value="public">Public Hospital</option>
                  </select>
                </div> */}
              </div>
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleApply}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-sm hover:bg-gray-500 transition-colors duration-200 font-medium"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 border border-black/20 dark:border-white/10 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors duration-200 font-medium"
                >
                  Reset
                </button>
              </div>
              <div className="mt-6 p-4 border border-black/20 dark:border-white/10 rounded-sm">
                <h3 className="text-sm font-semibold mb-2">Active Filters</h3>
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {localFilters.searchQuery && (
                    <div>Name: {localFilters.searchQuery}</div>
                  )}
                  {localFilters.selectedCountry && (
                    <div>Country: {getSelectedCountryName()}</div>
                  )}
                  {localFilters.selectedState && (
                    <div>State: {localFilters.selectedState}</div>
                  )}
                  {localFilters.hospitalType && (
                    <div>Type: {localFilters.hospitalType}</div>
                  )}
                  {!localFilters.searchQuery &&
                    !localFilters.selectedCountry &&
                    !localFilters.selectedState &&
                    !localFilters.hospitalType && (
                      <div className="text-gray-400 dark:text-gray-500">
                        No active filters
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
