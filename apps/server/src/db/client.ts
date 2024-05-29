// @ts-nocheck
import * as prismaAll from "@prisma/client";
/**
 * https://github.com/prisma/studio/issues/614
 *
 */

declare global {
  interface BigInt {
    toJSON(): number;
  }
}

BigInt.prototype.toJSON = function toJSON() {
  return Number(this);
};

export const prisma =
  global.prisma ??
  new prismaAll.PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV === "development") {
  global.prisma = prisma;
}
