import React, { useEffect, useState } from "react";
import styles from "./search.module.css";

const URL = import.meta.env.VITE_FETCH_SEARCH_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Search({
  foodData,
  setFoodData,
  setApiError,
  setIsLoading,
  query,
  setQuery,
}) {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchFood() {
      try {
        setIsLoading(true);
        setApiError(null);

        const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`, {
          signal,
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${res.status}`
          );
        }

        const data = await res.json();
        setFoodData(data.results || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to fetch food data:", error);
          setApiError("Sorry, we couldn't load recipes.");
          setFoodData([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    const debounceTimer = setTimeout(() => {
      if (query.trim()) {
        fetchFood();
      } else {
        setFoodData([]);
      }
    }, 500);
    return () => {
      controller.abort();
      clearTimeout(debounceTimer);
    };
  }, [query, setFoodData, setApiError, setIsLoading]);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.formInput}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search recipes..."
      />
    </div>
  );
}
