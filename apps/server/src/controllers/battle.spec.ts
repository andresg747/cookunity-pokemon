import { calculateWeaknessDamage, calculateResistanceDamage } from "./battle";

describe("calculateWeaknessDamage", () => {
  it("should correctly calculate damage with weaknesses", () => {
    const attackerTypes = ["fire"];
    const weaknesses = [{ type: "fire", value: "×2" }];
    const baseDamage = 10;

    const result = calculateWeaknessDamage(
      attackerTypes,
      weaknesses,
      baseDamage
    );

    expect(result.damage).toEqual(20);
    expect(result.multipliers).toEqual(["×2"]);
  });

  it("should not apply multiplier if attacker type does not match weakness", () => {
    const attackerTypes = ["water"];
    const weaknesses = [{ type: "fire", value: "×2" }];
    const baseDamage = 10;

    const result = calculateWeaknessDamage(
      attackerTypes,
      weaknesses,
      baseDamage
    );

    expect(result.damage).toEqual(10);
    expect(result.multipliers).toEqual([]);
  });
});

describe("calculateResistanceDamage", () => {
  it("should correctly calculate damage with resistances", () => {
    const attackerTypes = ["fire"];
    const resistances = [{ type: "fire", value: "-20" }];
    const baseDamage = 100;

    const result = calculateResistanceDamage(
      attackerTypes,
      resistances,
      baseDamage
    );

    expect(result.damage).toEqual(80);
    expect(result.reductions).toEqual(["-20"]);
  });

  it("should not apply reduction if attacker type does not match resistance", () => {
    const attackerTypes = ["water"];
    const resistances = [{ type: "fire", value: "-20" }];
    const baseDamage = 100;

    const result = calculateResistanceDamage(
      attackerTypes,
      resistances,
      baseDamage
    );

    expect(result.damage).toEqual(100);
    expect(result.reductions).toEqual([]);
  });
});
