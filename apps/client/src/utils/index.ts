export function getPokemonCardImage(card: any) {
  const [setId, setNumber] = card.id.split("-");
  return `https://images.pokemontcg.io/${setId}/${setNumber}_hires.png`;
}
