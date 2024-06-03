export type PokemonCard = {
    id: string;
    name: string;
    hp: number;
    baseDamage: number | null;
    types: PokemonCardType[];
    weaknesses: Weakness[];
    resistances: Resistance[];
};
export declare enum PokemonCardType {
    Darkness = "Darkness",
    Fighting = "Fighting",
    Fire = "Fire",
    Grass = "Grass",
    Lightning = "Lightning",
    Metal = "Metal",
    Psychic = "Psychic",
    Water = "Water"
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
export type BattleSummary = {
    attacker: PokemonCard;
    defender: PokemonCard;
    totalDamage: number;
    opponentLeftHp: number;
    appliedMultipliers: string[];
    appliedReductions: string[];
};
export type BattleRequest = {
    attacker: string;
    defender: string;
};
export type BattleResponse = {
    succeeded: boolean;
    battleSummary: BattleSummary;
};
