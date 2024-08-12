"use client";

import type { ChangeEvent } from "react";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";

function SearchBar() {
  interface Query {
    query: string;
  }
  type UpdatedQuery = Record<string, string>;

  const [searchQuery, setSearchQuery] = useState<Query>({
    query: "",
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedQuery = { ...searchQuery, [name]: value };

    setSearchQuery(updatedQuery);
    updateSearchQuery(updatedQuery);
  };

  const updateSearchQuery = (updatedQuery: UpdatedQuery) => {
    const params = new URLSearchParams(searchParams);

    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key]) {
        params.set(key, updatedQuery[key]);
      } else {
        params.delete(key);
      }
    });
    const queryString = params.toString();
    const updatedPath = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(updatedPath);
  };

  return (
    <nav className="mx-2 mb-8">
      <input
        className="px-8 py-2  text-xl text-black text-center"
        id="query"
        name="query"
        placeholder="Search meals"
        type="text"
        value={searchQuery.query}
        onChange={handleInputChange}
      />
    </nav>
  );
}

export default SearchBar;
