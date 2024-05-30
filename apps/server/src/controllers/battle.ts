import { NextFunction, Request, Response } from "express";
import db from "../db";
import { includeWeaknessesAndResistances } from "../utils";

const BattleController = {
  // POST /api/battle -  Create a new battle
  async fight(req: Request, res: Response, next: NextFunction) {
    try {
      const { attacker, defender } = req.body;

      if (!attacker || !defender) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // to calculate the outcome of the battle
      // first we get the attacker and defender cards from the database

      const attackerCard = await db.pokemonCard.findUnique({
        where: {
          id: attacker,
        },
        include: includeWeaknessesAndResistances,
      });

      const defenderCard = await db.pokemonCard.findUnique({
        where: {
          id: defender,
        },
        include: includeWeaknessesAndResistances,
      });

      // if either card is missing, return an error
      if (!attackerCard || !defenderCard) {
        return res
          .status(400)
          .json({ error: "Invalid attacker or defender card" });
      }

      // look up the types of the attacker and defender cards
      const attackerTypes = attackerCard.types;

      let damage = attackerCard.baseDamage; // Set your base damage

      if (defenderCard.weaknesses && defenderCard.weaknesses.length > 0) {
        damage = calculateWeaknessDamage(
          attackerTypes,
          defenderCard.weaknesses,
          damage
        );
      }

      if (defenderCard.resistances && defenderCard.resistances.length > 0) {
        damage = calculateResistanceDamage(
          attackerTypes,
          defenderCard.resistances,
          damage
        );
      }

      if (damage >= defenderCard.hp) {
        return res.json({ succeeded: true });
      } else {
        return res.json({ succeeded: false });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default BattleController;

function calculateWeaknessDamage(
  attackerTypes: string[],
  weaknesses: { type: string; value: string }[],
  baseDamage: number
): number {
  let damage = baseDamage;

  for (const weakness of weaknesses) {
    if (attackerTypes.includes(weakness.type)) {
      // Multiply the damage by the weakness value
      // For example, if the weakness value is 2, the damage is doubled
      const multiplier = parseFloat(weakness.value.replace("x", ""));
      damage *= multiplier;
    }
  }

  return damage;
}

function calculateResistanceDamage(
  attackerTypes: string[],
  resistances: { type: string; value: string }[],
  baseDamage: number
): number {
  let damage = baseDamage;

  for (const resistance of resistances) {
    if (attackerTypes.includes(resistance.type)) {
      // Subtract the resistance value from the damage
      // For example, if the resistance value is 20, subtract 20 from the damage
      const reduction = parseFloat(resistance.value.replace("-", ""));
      damage -= reduction;
    }
  }

  return damage;
}
