import request from "supertest";
import app from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.pokemonCard.create({
    data: {
      name: "Charizard",
      hp: 150,
      types: ["Fire"],
      baseDamage: 120,
      weaknesses: {
        create: [
          {
            type: "Water",
            value: "2x",
          },
        ],
      },
      resistances: {
        create: [
          {
            type: "Grass",
            value: "-30",
          },
        ],
      },
    },
  });
});

afterAll(async () => {
  // const deleteCards = prisma.pokemonCard.deleteMany();
  // await prisma.$transaction([deleteCards]);
  // await prisma.$disconnect();
});

describe("Cards API", () => {
  // POST /api/cards -  Create a new card
  it("should create a new card", async () => {
    const newCard = {
      name: "Pikachu",
      hp: 60,
      types: ["Lightning"],
      baseDamage: 20,
    };

    const res = await request(app).post("/api/cards").send(newCard);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("name", newCard.name);
  });

  // GET /api/cards - Get all cards
  it("should get card details", async () => {
    const res = await request(app).get("/api/cards");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  // GET /api/cards/:id - Get a card
  it("should get a card", async () => {
    const cardsListRequest = await request(app).get("/api/cards");
    const cardId = cardsListRequest.body[0].id;

    const res = await request(app).get(`/api/cards/${cardId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("hp");
    expect(res.body).toHaveProperty("types");
    expect(res.body).toHaveProperty("baseDamage");
  });

  // PUT /api/cards/:id - Update a card
  it("should update a card", async () => {
    const cardsListRequest = await request(app).get("/api/cards");
    const cardId = cardsListRequest.body[1].id;

    const updatedCard = {
      name: "Blastoise", // My favorite Pokemon 😄
      hp: 150,
      types: ["Water"],
      baseDamage: 120,
    };

    const res = await request(app)
      .put(`/api/cards/${cardId}`)
      .send(updatedCard);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id", cardId);
    expect(res.body).toHaveProperty("name", updatedCard.name);
  });

  // GET /api/cards/:id/analyze - Get card weaknesses and resistances
  it("should get card weaknesses and resistances", async () => {
    const card = await prisma.pokemonCard.findFirst({
      where: {
        name: "Charizard",
      },
      include: {
        weaknesses: true,
        resistances: true,
      },
    });

    // this is only for TypeScript
    if (!card) {
      throw new Error("Card not found");
    }

    const res = await request(app).get(`/api/cards/${card.id}/analyze`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.weakAgainst).toHaveLength(1);
    expect(res.body.resistantTo).toHaveLength(0);
    expect(res.body.weakAgainst[0].name).toEqual("Blastoise");
  });

  // DELETE /api/cards/:id - Delete a card
  // it("should delete a card", async () => {
  //   const cardsListRequest = await request(app).get("/api/cards");
  //   const cardId = cardsListRequest.body[0].id;
  //   const res = await request(app).delete(`/api/cards/${cardId}`);
  //   const cardsListRequestAfterDelete = await request(app).get("/api/cards");

  //   expect(cardsListRequestAfterDelete.body).toHaveLength(1);
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty("message");
  // });
});
