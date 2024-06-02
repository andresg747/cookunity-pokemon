"use client";

import Navigation from "@/components/navigation";
import { FilterProvider } from "@/hooks/context/filter";
import { useState } from "react";

export default function App({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState("");

  return (
    <FilterProvider value={{ filter, setFilter }}>
      <Navigation />
      {children}
    </FilterProvider>
  );
}
