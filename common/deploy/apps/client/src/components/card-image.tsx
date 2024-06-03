import { cn } from "@/lib/utils";
import { getPokemonCardImage } from "@/utils";
import { PokemonCard } from "@ag-cookunity/types";

import Image from "next/image";

export default function PokemonCardImage({
  card,
  className,
  onClick,
}: {
  card: PokemonCard;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Image
      src={getPokemonCardImage(card)}
      width={230}
      height={310}
      alt={`Pokemon card - ${card.name}`}
      className={cn("h-full object-cover", className)}
      onClick={onClick}
    />
  );
}
