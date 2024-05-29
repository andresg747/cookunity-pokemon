-- DropForeignKey
ALTER TABLE "Resistance" DROP CONSTRAINT "Resistance_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Weakness" DROP CONSTRAINT "Weakness_cardId_fkey";

-- AddForeignKey
ALTER TABLE "Weakness" ADD CONSTRAINT "Weakness_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "PokemonCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resistance" ADD CONSTRAINT "Resistance_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "PokemonCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
