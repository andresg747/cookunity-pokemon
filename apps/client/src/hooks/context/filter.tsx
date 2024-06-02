import { createContext } from "react";

interface ContextType {
  filter: string;
  setFilter: (filter: string) => void;
}

const initialContext: ContextType = {
  filter: "",
  setFilter: () => {},
};

export const FilterContext = createContext<ContextType>(initialContext);
export const FilterProvider = FilterContext.Provider;
