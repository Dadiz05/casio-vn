import { useState, useMemo } from "react";
import useDebounce from "./useDebounce";

/**
 * useSearch — search/filter products by name, sku, or category
 *
 * @param {Array}  products  - full product list from store/API
 * @param {Object} options
 * @param {number} options.debounceMs  - debounce delay (default 300ms)
 * @param {number} options.maxResults  - max dropdown suggestions (default 8)
 *
 * @returns {{ query, setQuery, results, isSearching }}
 */
export default function useSearch(products = [], { debounceMs = 300, maxResults = 8 } = {}) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, debounceMs);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];

    return products
      .filter((p) => {
        const name = (p.name || "").toLowerCase();
        const sku = (p.sku || "").toLowerCase();
        const category = (p.category || "").toLowerCase();
        return name.includes(q) || sku.includes(q) || category.includes(q);
      })
      .slice(0, maxResults);
  }, [debouncedQuery, products, maxResults]);

  return {
    query,
    setQuery,
    results,
    isSearching: debouncedQuery.trim().length > 0,
  };
}