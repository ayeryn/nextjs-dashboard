"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    /**
     * 1. What is params at this point?
     * a. If term, then params = {query: <term>}
     * b. If none, then params = {}
     *
     * 2. What does params.toString() return?
     * query=<term> or ""
     *
     * 3. replace()
     * replaces the current URL with a new URL that includes the current
     * pathname and adds or updates the query parameter in the URL with the value of "query".
     *
     * AKA: /invoices => invoices?query=<term>
     *
     * NOTE: this updates the searchParams on the browser in REAL-TIME!!!
     */
    replace(`${pathname}?${params.toString()}`);
  }, 300); // Only run after 300ms

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
