import Image from "next/image";
import { Input } from "./ui/input";
import { useContext, useState } from "react";
import { FilterContext } from "@/hooks/context/filter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PokemonCardTypes } from "@/utils";
import { Button } from "./ui/button";

export default function Navigation() {
  const { filter, setFilter } = useContext(FilterContext);
  const [isTypeSelectOpen, setIsTypeSelectOpen] = useState(false);

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilter({
      ...filter,
      name: event.target.value,
    });
  };

  const handleTypeFilterChange = (value: string) => {
    setFilter({
      ...filter,
      type: value,
    });
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

      <div className="flex space-x-8">
        <Input
          value={filter.name}
          onChange={handleNameFilterChange}
          placeholder="Filter by name"
          className="min-w-[230px]"
        />
        <Select
          open={isTypeSelectOpen}
          onOpenChange={setIsTypeSelectOpen}
          onValueChange={handleTypeFilterChange}
          value={filter.type}
        >
          <SelectTrigger className="w-[180px] min-w-[230px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {filter.type && (
              <Button
                className="w-full px-2"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilter({
                    ...filter,
                    type: "",
                  });
                  setIsTypeSelectOpen(false);
                }}
              >
                Clear
              </Button>
            )}
            {PokemonCardTypes.map((type) => (
              <SelectItem
                key={type}
                value={type}
                className="font-semibold text-slate-700"
              >
                <span className="grow">{type}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}
