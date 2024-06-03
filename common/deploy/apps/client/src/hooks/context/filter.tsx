import { createContext } from "react";

interface ContextType {
  filter: {
    name: string;
    type: string;
  };
  setFilter: (filter: { name: string; type: string }) => void;
}

const initialContext: ContextType = {
  filter: {
    name: "",
    type: "",
  },
  setFilter: () => {},
};

export const FilterContext = createContext<ContextType>(initialContext);
export const FilterProvider = FilterContext.Provider;
