"use client";

import { useCards } from "@/queries/use-cards";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function CardList({ className }: { className?: string }) {
  const { data: cards, isLoading, isError } = useCards();

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
          const [setId, setNumber] = card.id.split("-");
          return (
            <div
              key={card.id}
              className="overflow-hidden cursor-pointer hover:shadow-xl ease-in-out hover:-translate-y-1 transform  rounded-xl bg-white shadow-md transition duration-150 hover:scale-105 hover:border-transparent border-2 border-gray-200"
            >
              <div className="bg-cover bg-center">
                <Image
                  src={`https://images.pokemontcg.io/${setId}/${setNumber}_hires.png`}
                  width={230}
                  height={320}
                  alt={`Pokemon card - ${card.name}`}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
