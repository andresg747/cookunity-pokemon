const typeEffectiveness = {
  Fire: {
    weakAgainst: ["Water", "Ground", "Rock"],
    resistantTo: ["Fire", "Grass", "Bug", "Steel"],
  },
  Water: {
    weakAgainst: ["Lightning", "Grass"],
    resistantTo: ["Fire", "Water", "Ice", "Steel"],
  },
  Grass: {
    weakAgainst: ["Fire", "Ice", "Poison", "Flying", "Bug"],
    resistantTo: ["Water", "Lightning", "Grass", "Ground"],
  },
  Lightning: {
    weakAgainst: ["Ground"],
    resistantTo: ["Lightning", "Flying", "Steel"],
  },
  Ground: {
    weakAgainst: ["Water", "Grass", "Ice"],
    resistantTo: ["Poison", "Rock"],
  },
  Bug: {
    weakAgainst: ["Fire", "Flying", "Rock"],
    resistantTo: ["Grass", "Fighting", "Ground"],
  },
  Rock: {
    weakAgainst: ["Water", "Grass", "Fighting", "Ground", "Steel"],
    resistantTo: ["Normal", "Fire", "Poison", "Flying"],
  },
  Steel: {
    weakAgainst: ["Fire", "Fighting", "Ground"],
    resistantTo: [
      "Normal",
      "Grass",
      "Ice",
      "Flying",
      "Psychic",
      "Bug",
      "Rock",
      "Dragon",
      "Steel",
      "Fairy",
    ],
  },
};

export { typeEffectiveness };
