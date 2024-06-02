import Image from "next/image";
import { Input } from "./ui/input";
import { useContext } from "react";
import { FilterContext } from "@/hooks/context/filter";

export default function Navigation() {
  const { filter, setFilter } = useContext(FilterContext);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <nav className="flex items-center h-24 border-slate-200 space-x-10">
      <div className="flex items-center justify-center">
        <a
          href="/"
          className="text-2xl flex items-center space-x-3 font-bold p-4 hover:bg-slate-50 hover:rounded-2xl"
        >
          <Image
            src="/images/pokemon-logo.png"
            alt="Logo"
            width={200}
            height={72}
          />
          <h2 className="text-3xl text-red-600">App</h2>
        </a>
      </div>

      <div>
        <Input
          value={filter}
          onChange={handleFilterChange}
          placeholder="Search by name"
          className="min-w-[300px]"
        />
      </div>
    </nav>
  );
}
