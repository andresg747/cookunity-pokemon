export type PokemonCard = {
  id: string;
  name: string;
  hp: number;
  baseDamage: number | null;
  types: PokemonCardType[];
  weaknesses: Weakness[];
  resistances: Resistance[];
};

enum PokemonCardType {
  Darkness = "Darkness",
  Fighting = "Fighting",
  Fire = "Fire",
  Grass = "Grass",
  Lightning = "Lightning",
  Metal = "Metal",
  Psychic = "Psychic",
  Water = "Water",
}

export type Weakness = {
  id: string;
  type: PokemonCardType;
  value: string;
  card: PokemonCard;
  cardId: string;
};

export type Resistance = {
  id: string;
  type: PokemonCardType;
  value: string;
  card: PokemonCard;
  cardId: string;
};
