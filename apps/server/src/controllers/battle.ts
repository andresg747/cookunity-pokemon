import { NextFunction, Request, Response } from "express";
import db from "../db";
import { PokemonCardType } from "@prisma/client";
import { includeWeaknessesAndResistances } from "../utils";
import {
  BattleResponse,
  BattleRequest,
  BattleSummary,
} from "@ag-cookunity/types";

const BattleController = {
  // POST /api/battle -  Create a new battle
  async fight(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<BattleResponse>> {
    try {
      const { attacker, defender } = <BattleRequest>req.body;

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
      let appliedMultipliers = [];
      let appliedReductions = [];

      if (defenderCard.weaknesses && defenderCard.weaknesses.length > 0) {
        const { damage: damageAfterWeakness, multipliers } =
          calculateWeaknessDamage(
            attackerTypes,
            defenderCard.weaknesses,
            damage
          );
        damage = damageAfterWeakness;
        appliedMultipliers = multipliers;
      }

      if (defenderCard.resistances && defenderCard.resistances.length > 0) {
        const { damage: damageAfterResistance, reductions } =
          calculateResistanceDamage(
            attackerTypes,
            defenderCard.resistances,
            damage
          );
        damage = damageAfterResistance;
        appliedReductions = reductions;
      }

      const battleSummary = {
        attacker: attackerCard,
        defender: defenderCard,
        totalDamage: damage,
        opponentLeftHp: Math.max(0, defenderCard.hp - damage),
        appliedMultipliers,
        appliedReductions,
      } as BattleSummary;

      if (damage >= defenderCard.hp) {
        return res.json({
          succeeded: true,
          battleSummary,
        });
      } else {
        return res.json({
          succeeded: false,
          battleSummary,
        });
      }
    } catch (error) {
      next(error);
    }
  },
};

export default BattleController;

// If you wonder why these functions below are here and not in a separate file,
// check this principle I like to follow: https://kentcdodds.com/blog/colocation#the-principle
function calculateWeaknessDamage(
  attackerTypes: string[],
  weaknesses: { type: string; value: string }[],
  baseDamage: number
): { damage: number; multipliers: string[] } {
  let damage = baseDamage;
  let multipliers: string[] = [];

  for (const weakness of weaknesses) {
    if (attackerTypes.includes(weakness.type)) {
      // Multiply the damage by the weakness value
      const multiplier = parseFloat(weakness.value.replace("×", ""));
      damage *= multiplier;
      multipliers.push(weakness.value);
    }
  }

  return { damage, multipliers };
}

function calculateResistanceDamage(
  attackerTypes: string[],
  resistances: { type: string; value: string }[],
  baseDamage: number
): { damage: number; reductions: string[] } {
  let damage = baseDamage;
  let reductions: string[] = [];

  for (const resistance of resistances) {
    if (attackerTypes.includes(resistance.type)) {
      // Subtract the resistance value from the damage
      const reduction = parseFloat(resistance.value.replace("-", ""));
      damage -= reduction;
      reductions.push(resistance.value);
    }
  }

  return { damage, reductions };
}
