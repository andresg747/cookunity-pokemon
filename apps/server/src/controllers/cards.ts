import { NextFunction, Request, Response } from "express";
import db, { PokemonCardType } from "../db";
import { ValidationError } from "../errors/validation";
import { includeWeaknessesAndResistances } from "../utils";

type PokemonCardCreateRequest = {
  id: string;
  name: string;
  hp: number | string;
  types: PokemonCardType[];
  weaknesses?: { type: PokemonCardType; value: string }[];
  resistances?: { type: PokemonCardType; value: string }[];
  baseDamage: number;
};

type PokemonCardCreate = Omit<
  PokemonCardCreateRequest,
  "hp" | "weaknesses" | "resistances"
> & {
  hp: number;
  weaknesses?: {
    create: { type: PokemonCardType; value: string }[];
  };
  resistances?: {
    create: { type: PokemonCardType; value: string }[];
  };
};

export class CardsController {
  // POST /api/cards -  Create a new card
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    try {
      const { name, hp, types, weaknesses, resistances, baseDamage } = <
        PokemonCardCreateRequest
      >req.body;

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

      if (!baseDamage || isNaN(baseDamage)) {
        throw new ValidationError("Invalid base damage", ["baseDamage"]);
      }

      if (
        weaknesses &&
        weaknesses.some(
          (w: { type: PokemonCardType }) => !PokemonCardType[w.type]
        )
      ) {
        throw new ValidationError("Invalid weakness type", ["weaknesses"]);
      }

      if (
        resistances &&
        resistances.some(
          (r: { type: PokemonCardType }) => !PokemonCardType[r.type]
        )
      ) {
        throw new ValidationError("Invalid resistance type", ["resistances"]);
      }

      if (
        types.some(
          (t: PokemonCardType) => typeof t !== "string" || !PokemonCardType[t]
        )
      ) {
        throw new ValidationError("Invalid type", ["types"]);
      }

      const newCard = await db.pokemonCard.create({
        data: prepareCardData(req.body),
        include: includeWeaknessesAndResistances,
      });

      return res.status(201).json(newCard);
    } catch (error) {
      next(error);
    }
  }

  // GET /api/cards/:id - Get card details
  public async getDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
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
  }

  // GET /api/cards - List all cards
  public async listAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    try {
      const { page = 1, limit = 10 } = req.query;

      const cards = await db.pokemonCard.findMany({
        include: includeWeaknessesAndResistances,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
      });
      return res.json(cards);
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/cards/:id - Update a card
  public async update(req: Request, res: Response, next: NextFunction) {
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
  }

  // DELETE /api/cards/:id - Delete a card
  public async delete(req: Request, res: Response, next: NextFunction) {
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
  }

  // GET /api/cards/:id/analyze - Get card weaknesses and resistances
  public async analyze(req: Request, res: Response, next: NextFunction) {
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
  }
}

export default CardsController;

function prepareCardData(body: PokemonCardCreateRequest): PokemonCardCreate {
  const { weaknesses, resistances, hp, name, baseDamage } = body;

  let hpValue: number;
  if (typeof hp === "string") {
    hpValue = parseInt(hp, 10);
  } else {
    hpValue = hp;
  }

  return {
    id: body.id,
    name,
    baseDamage,
    hp: hpValue,
    types: body.types,
    weaknesses:
      weaknesses && weaknesses.length > 0
        ? {
            create: weaknesses.map(
              (w: { type: PokemonCardType; value: string }) => ({
                type: w.type,
                value: w.value,
              })
            ),
          }
        : undefined,
    resistances:
      resistances && resistances.length > 0
        ? {
            create: resistances.map(
              (r: { type: PokemonCardType; value: string }) => ({
                type: r.type,
                value: r.value,
              })
            ),
          }
        : undefined,
  };
}
