/*
  Warnings:

  - The primary key for the `PokemonCard` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Resistance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Weakness` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Resistance" DROP CONSTRAINT "Resistance_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Weakness" DROP CONSTRAINT "Weakness_cardId_fkey";

-- AlterTable
ALTER TABLE "PokemonCard" DROP CONSTRAINT "PokemonCard_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PokemonCard_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PokemonCard_id_seq";

-- AlterTable
ALTER TABLE "Resistance" DROP CONSTRAINT "Resistance_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cardId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Resistance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Resistance_id_seq";

-- AlterTable
ALTER TABLE "Weakness" DROP CONSTRAINT "Weakness_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "cardId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Weakness_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Weakness_id_seq";

-- AddForeignKey
ALTER TABLE "Weakness" ADD CONSTRAINT "Weakness_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "PokemonCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resistance" ADD CONSTRAINT "Resistance_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "PokemonCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
