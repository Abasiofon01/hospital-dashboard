import { useEffect, useState } from "react";
import type { Hospital } from "../types";
import { apiFetch, buildQueryString } from "../utils/api";

interface StoreState {
  hospitals: Hospital[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCountry: string;
  selectedState: string;
  currentPage: number;
  itemsPerPage: number;
  apiTotalPages: number;
  apiTotalCount: number;
  selectedHospital: Hospital | null;
}

const createStore = () => {
  const state: StoreState = {
    hospitals: [],
    loading: false,
    error: null,
    searchQuery: "",
    selectedCountry: "166",
    selectedState: "",
    currentPage: 1,
    itemsPerPage: 10,
    apiTotalPages: 1,
    apiTotalCount: 0,
    selectedHospital: null,
  };

  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());

  const store = {
    getState: () => state,

    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    setPagedData: (
      hospitals: Hospital[],
      totalPages: number,
      totalCount: number
    ) => {
      state.hospitals = hospitals;
      state.apiTotalPages = totalPages;
      state.apiTotalCount = totalCount;
      notify();
    },

    setLoading: (loading: boolean) => {
      state.loading = loading;
      notify();
    },

    setError: (error: string | null) => {
      state.error = error;
      notify();
    },

    setSearchQuery: (query: string) => {
      state.searchQuery = query;
      state.currentPage = 1;
      notify();
    },

    setSelectedState: (stateValue: string) => {
      state.selectedState = stateValue;
      state.currentPage = 1;
      notify();
    },

    setSelectedCountry: (countryId: string) => {
      state.selectedCountry = countryId;
      state.currentPage = 1;
      notify();
    },

    setCurrentPage: (page: number) => {
      state.currentPage = page;
      notify();
    },

    setItemsPerPage: (items: number) => {
      state.itemsPerPage = items;
      state.currentPage = 1;
      notify();
    },

    setSelectedHospital: (hospital: Hospital | null) => {
      state.selectedHospital = hospital;
      notify();
    },

    fetchHospitals: async () => {
      const {
        currentPage,
        itemsPerPage,
        searchQuery,
        selectedState,
        selectedCountry,
      } = state;

      store.setLoading(true);
      store.setError(null);

      const queryString = buildQueryString({
        countryId: selectedCountry,
        page: currentPage,
        perPage: itemsPerPage,
        state: selectedState,
        searchTerm: searchQuery,
      });

      const API_URL = `https://backend-dev.sofiamatics.com/api/v1/hospitals${queryString}`;

      try {
        const apiData = await apiFetch<{
          data: Hospital[];
          totalPages: number;
          totalCount: number;
        }>(API_URL);

        const hospitals = (apiData.data || []).sort(
          (a: Hospital, b: Hospital) =>
            a.hospitalName.localeCompare(b.hospitalName)
        );

        store.setPagedData(
          hospitals,
          apiData.totalPages || 1,
          apiData.totalCount || 0
        );
      } catch (err) {
        store.setError(
          err instanceof Error ? err.message : "An error occurred"
        );
      } finally {
        store.setLoading(false);
      }
    },
  };

  return store;
};

let storeInstance: ReturnType<typeof createStore>;

const getStore = () => {
  if (!storeInstance) storeInstance = createStore();
  return storeInstance;
};

const useStore = () => {
  const [, forceUpdate] = useState({});
  const store = getStore();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate({}));
    return unsubscribe;
  }, []);

  return store;
};

export { getStore, useStore };
