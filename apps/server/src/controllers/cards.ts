import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/client";
import { PokemonCardType } from "@prisma/client";
import { ValidationError } from "../errors/validation";
import { includeWeaknessesAndResistances } from "../utils";

// TODO: BaseDamage on card creation

const CardsController = {
  // POST /api/cards -  Create a new card
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, hp, types, weaknesses, resistances } = req.body;

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

      const newCard = await prisma.pokemonCard.create({
        data: {
          name,
          hp: parseInt(hp, 10),
          types,
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
        },
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
      const card = await prisma.pokemonCard.findUnique({
        where: {
          id: parseInt(id),
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
      const cards = await prisma.pokemonCard.findMany({
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

      const { name, hp, types, weaknesses, resistances } = req.body;

      // TODO: validations for types, weaknesses, and resistances

      const updatedCard = await prisma.pokemonCard.update({
        where: {
          id: parseInt(id),
        },
        data: req.body,
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
      await prisma.pokemonCard.delete({
        where: {
          id: parseInt(id),
        },
      });
      return res.json({
        message: `Card with id ${id} has been deleted successfully.`,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default CardsController;
