import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Filter } from "lucide-react";
import { useStore } from "../store/hospitalStore";
import SearchBar from "../components/SearchBar";
import HospitalTable from "../components/HospitalTable";
import Pagination from "../components/Pagination";
import HospitalDetailModal from "../components/HospitalDetailModal";
import { useCountryStore } from "../store/countries.store";
import FilterModal from "../components/FilterModal";
import type { DropdownAction, Hospital, HospitalFilters } from "../types";

const HospitalsPage = () => {
  const store = useStore();
  const state = store.getState();

  const countryStore = useCountryStore();
  const { countries, loading: countryLoading } = countryStore.getState();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleApplyFilters = (filters: HospitalFilters) => {
    store.setSearchQuery(filters.searchQuery);
    store.setSelectedCountry(filters.selectedCountry);
    store.setSelectedState(filters.selectedState);
  };

  const handleHospitalNameClick = (hospital: Hospital) => {
    store.setSelectedHospital(hospital);
  };

  const dropdownActions: DropdownAction[] = [
    {
      label: "View",
      onClick: (hospital) => store.setSelectedHospital(hospital),
    },
    // {
    //   label: "Delete Hospital",
    //   onClick: (hospital) => {

    //   },
    //   icon: <Trash2 className="h-4 w-4" />,
    //   variant: 'destructive',
    // },
  ];

  const {
    currentPage,
    itemsPerPage,
    searchQuery,
    selectedState,
    selectedCountry,
    hospitals,
    apiTotalPages: totalPages,
  } = state;

  useEffect(() => {
    store.fetchHospitals();
  }, [
    currentPage,
    itemsPerPage,
    searchQuery,
    selectedState,
    selectedCountry,
    store,
  ]);

  useEffect(() => {
    countryStore.fetchCountries();
  }, [countryStore]);

  return (
    <>
      <div className="flex justify-between gap-4 py-2.5 px-5 sm:px-7 lg:px-10 border bg-gray-50 border-gray-200 dark:bg-[#111111] dark:border-[#2A2A2A]">
        <SearchBar
          searchQuery={state.searchQuery}
          onSearchChange={store.setSearchQuery}
          placeholder="Search by hospital name"
          className="max-w-[375px]"
        />

        <div className="flex items-center gap-3">
          <select
            value={state.selectedCountry}
            onChange={(e) => store.setSelectedCountry(e.target.value)}
            className="px-3 py-1 rounded border max-w-[152px] hidden lg:flex bg-white text-gray-900 border-gray-200 dark:bg-black dark:text-white dark:border-[#2A2A2A]"
          >
            {countryLoading && <option>Loading...</option>}

            {!countryLoading &&
              countries.map((c) => (
                <option key={c.id} value={c.id.toString()}>
                  {c.name}
                </option>
              ))}
          </select>

          <button
            onClick={() => setIsFilterOpen(true)}
            className="px-3 py-1 rounded border bg-white text-gray-900 border-gray-200 dark:bg-black dark:text-white dark:border-[#2A2A2A] hover:bg-gray-50 dark:hover:bg-gray-500/5 transition-colors flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden lg:inline-block">Filters</span>
          </button>
        </div>
      </div>

      {state.loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gray-600" size={40} />
        </div>
      )}

      {state.error && (
        <div className="p-4 rounded-lg bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center gap-3">
          <AlertCircle size={20} />
          <span>{state.error}</span>
        </div>
      )}

      {!state.loading && !state.error && (
        <>
          <HospitalTable
            hospitals={hospitals}
            dropdownActions={dropdownActions}
            onHospitalClick={handleHospitalNameClick}
            isEmptySearchResult={
              state.searchQuery !== "" || state.selectedState !== ""
            }
            emptyStateMessage={
              state.searchQuery !== ""
                ? `No hospitals found for "${state.searchQuery}"`
                : state.selectedState
                ? `No hospitals found in ${state.selectedState}`
                : ""
            }
          />

          <Pagination
            currentPage={state.currentPage}
            totalPages={totalPages}
            itemsPerPage={state.itemsPerPage}
            onPageChange={store.setCurrentPage}
            onItemsPerPageChange={store.setItemsPerPage}
            className="pl-5 pr-5 sm:pr-10 sm:pl-0"
          />
        </>
      )}

      {state.selectedHospital && (
        <HospitalDetailModal
          hospital={state.selectedHospital}
          onClose={() => store.setSelectedHospital(null)}
        />
      )}

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={{
          searchQuery: state.searchQuery,
          selectedCountry: state.selectedCountry,
          selectedState: state.selectedState,
          hospitalType: "",
        }}
        onApplyFilters={handleApplyFilters}
        countries={countries}
      />
    </>
  );
};

export default HospitalsPage;
