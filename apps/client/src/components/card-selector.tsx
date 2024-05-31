import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PokemonCard } from "@ag-cookunity/types";

export default function CardSelector({
  cards,
  onCardSelected,
}: {
  cards: PokemonCard[];
  onCardSelected: (card: any) => void;
}) {
  return (
    <div className="pb-72">
      <Select
        onValueChange={(cardId) => {
          onCardSelected(cards.find((card) => card.id === cardId));
        }}
      >
        <SelectTrigger className="w-[180px] font-medium">
          <SelectValue placeholder="Select an opponent" />
        </SelectTrigger>
        <SelectContent>
          {cards.map((card) => (
            <SelectItem
              key={card.id}
              value={card.id}
              className="font-semibold text-slate-700"
            >
              {card.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
