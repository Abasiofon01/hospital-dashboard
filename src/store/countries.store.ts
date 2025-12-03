import { useEffect, useState } from "react";
import type { Country } from "../types";
import { apiFetch } from "../utils/api";

interface CountryStoreState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const createCountryStore = () => {
  const state: CountryStoreState = {
    countries: [],
    loading: false,
    error: null,
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

    setCountries: (countries: Country[]) => {
      state.countries = countries;
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

    fetchCountries: async () => {
      const API_URL = "https://backend-dev.sofiamatics.com/api/v1/countries";

      store.setLoading(true);
      store.setError(null);

      try {
        const countries = await apiFetch<Country[]>(API_URL);
        store.setCountries(countries || []);
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

let countryStoreInstance: ReturnType<typeof createCountryStore>;
const getCountryStore = () => {
  if (!countryStoreInstance) countryStoreInstance = createCountryStore();
  return countryStoreInstance;
};

const useCountryStore = () => {
  const [, forceUpdate] = useState({});
  const store = getCountryStore();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => forceUpdate({}));
    return unsubscribe;
  }, []);

  return store;
};

export { useCountryStore, getCountryStore };
