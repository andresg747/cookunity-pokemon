"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import PokemonCardImage from "./card-image";
import { PokemonCard } from "@ag-cookunity/types";

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
  if (isError) return <div>Error</div>;
  if (isLoading)
    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8",
          className
        )}
      >
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="w-[230px] h-[320px] animate-pulse" />
        ))}
      </div>
    );

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8",
        className
      )}
    >
      {cards &&
        cards.map((card: any) => {
          return (
            <div
              key={card.id}
              onClick={() => {
                onCardSelected(card);
              }}
              className="overflow-hidden cursor-pointer hover:shadow-xl ease-in-out hover:-translate-y-1 transform  rounded-xl bg-white shadow-md transition duration-150 hover:scale-105 hover:border-transparent border-2 border-gray-200"
            >
              <PokemonCardImage card={card} />
            </div>
          );
        })}
    </div>
  );
}
