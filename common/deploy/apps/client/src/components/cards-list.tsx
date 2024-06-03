"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import PokemonCardImage from "./card-image";
import { PokemonCard, PokemonCardType } from "@ag-cookunity/types";
import { useContext, useMemo } from "react";
import { FilterContext } from "@/hooks/context/filter";

export default function CardList({
  onCardSelected,
  className,
  cards,
  isError,
  isLoading,
}: {
  onCardSelected: (card: any) => void;
  className?: string;
  cards: PokemonCard[];
  isError: boolean;
  isLoading: boolean;
}) {
  const { filter } = useContext(FilterContext);

  const filteredCards = useMemo(() => {
    if (!cards) return [];
    if (!filter) return cards;
    return cards
      .filter((card) => {
        if (!filter.type) return true;
        return card.types.includes(filter.type as PokemonCardType);
      })
      .filter((card) => {
        if (!filter.name) return true;
        return card.name.toLowerCase().includes(filter.name.toLowerCase());
      });
  }, [cards, filter]);

  if (isError) return <div>Error</div>;
  if (isLoading)
    return (
      <div className={cn("grid grid-cols-3 lg:grid-cols-5 gap-8", className)}>
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="w-[230px] h-[320px] animate-pulse" />
        ))}
      </div>
    );

  if (!filteredCards.length)
    return (
      <div className="flex items-center justify-center h-96">
        <h2 className="text-3xl text-gray-500">No results found</h2>
      </div>
    );

  return (
    <div className={cn("grid grid-cols-3 lg:grid-cols-5 gap-8", className)}>
      {filteredCards.map((card: any) => {
        return (
          <div
            key={card.id}
            onClick={() => {
              onCardSelected(card);
            }}
            className="overflow-hidden cursor-pointer lg:hover:shadow-xl ease-in-out lg:hover:-translate-y-1 lg:transform rounded-xl bg-white lg:shadow-md lg:transition lg:duration-150 lg:hover:scale-105 lg:hover:border-transparent lg:border-2 border-gray-200"
          >
            <PokemonCardImage card={card} />
          </div>
        );
      })}
    </div>
  );
}
