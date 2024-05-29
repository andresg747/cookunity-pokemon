-- CreateEnum
CREATE TYPE "PokemonCardType" AS ENUM ('Darkness', 'Fighting', 'Fire', 'Lightning', 'Metal', 'Psychic', 'Water');

-- CreateTable
CREATE TABLE "PokemonCard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hp" INTEGER NOT NULL,
    "types" "PokemonCardType"[],

    CONSTRAINT "PokemonCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weakness" (
    "id" SERIAL NOT NULL,
    "type" "PokemonCardType" NOT NULL,
    "value" TEXT NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "Weakness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resistance" (
    "id" SERIAL NOT NULL,
    "type" "PokemonCardType" NOT NULL,
    "value" TEXT NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "Resistance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weakness" ADD CONSTRAINT "Weakness_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "PokemonCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resistance" ADD CONSTRAINT "Resistance_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "PokemonCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
