import { NextFunction, Request, Response } from "express";
import db, { PokemonCardType } from "../db";
import { ValidationError } from "../errors/validation";
import { includeWeaknessesAndResistances } from "../utils";

const CardsController = {
  // POST /api/cards -  Create a new card
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, hp, types, weaknesses, resistances, baseDamage } = req.body;

      if (!name || !hp || !types) {
        throw new ValidationError("Missing required fields", [
          "name",
          "hp",
          "types",
        ]);
      }

      if (!Array.isArray(types) || types.length === 0) {
        throw new ValidationError("Types must be a non-empty array", ["types"]);
      }

      if (weaknesses && weaknesses.some((w) => !PokemonCardType[w.type])) {
        throw new ValidationError("Invalid weakness type", ["weaknesses"]);
      }

      if (resistances && resistances.some((r) => !PokemonCardType[r.type])) {
        throw new ValidationError("Invalid resistance type", ["resistances"]);
      }

      if (types.some((t) => typeof t !== "string" || !PokemonCardType[t])) {
        throw new ValidationError("Invalid type", ["types"]);
      }

      const newCard = await db.pokemonCard.create({
        data: prepareCardData(req.body),
        include: includeWeaknessesAndResistances,
      });

      return res.json(newCard);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/cards/:id - Get card details
  async getDetails(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const card = await db.pokemonCard.findUnique({
        where: {
          id,
        },
        include: includeWeaknessesAndResistances,
      });
      return res.json(card);
    } catch (error) {
      next(error);
    }
  },

  // GET /api/cards - List all cards
  async listAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cards = await db.pokemonCard.findMany({
        include: includeWeaknessesAndResistances,
      });
      return res.json(cards);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/cards/:id - Update a card
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const updatedCard = await db.pokemonCard.update({
        where: {
          id,
        },
        data: prepareCardData(req.body),
        include: includeWeaknessesAndResistances,
      });

      return res.json(updatedCard);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/cards/:id - Delete a card
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await db.pokemonCard.delete({
        where: {
          id,
        },
      });
      return res.json({
        message: `Card with id ${id} has been deleted successfully.`,
      });
    } catch (error) {
      next(error);
    }
  },

  // GET /api/cards/:id/analyze - Get card weaknesses and resistances
  async analyze(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const card = await db.pokemonCard.findUnique({
        where: {
          id,
        },
        include: includeWeaknessesAndResistances,
      });

      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }

      // Extract the types from the weaknesses and resistances
      const weaknesses = card.weaknesses.map((w) => ({
        type: w.type,
      }));

      const resistances = card.resistances.map((r) => ({
        type: r.type,
      }));

      // Search for other cards that have the same types as the weaknesses and resistances
      const cardsWithWeaknesses = await db.pokemonCard.findMany({
        where: {
          types: {
            hasSome: weaknesses.map((w) => w.type),
          },
        },
      });

      const cardsWithResistances = await db.pokemonCard.findMany({
        where: {
          types: {
            hasSome: resistances.map((r) => r.type),
          },
        },
      });

      return res.json({
        id: card.id,
        name: card.name,
        types: card.types,
        weakAgainst: cardsWithWeaknesses,
        resistantTo: cardsWithResistances,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default CardsController;

function prepareCardData(body) {
  const { weaknesses, resistances, hp, ...rest } = body;

  return {
    ...rest,
    hp: hp ? parseInt(hp, 10) : hp,
    weaknesses:
      weaknesses && weaknesses.length > 0
        ? {
            create: weaknesses.map((w) => ({
              type: w.type,
              value: w.value,
            })),
          }
        : undefined,
    resistances:
      resistances && resistances.length > 0
        ? {
            create: resistances.map((r) => ({
              type: r.type,
              value: r.value,
            })),
          }
        : undefined,
  };
}
