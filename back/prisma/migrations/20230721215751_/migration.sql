/*
  Warnings:

  - You are about to drop the column `userId` on the `rate` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rate" DROP CONSTRAINT "rate_userId_fkey";

-- DropIndex
DROP INDEX "rate_userId_key";

-- AlterTable
ALTER TABLE "Condominium" ADD COLUMN     "rateId" TEXT;

-- AlterTable
ALTER TABLE "rate" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Condominium" ADD CONSTRAINT "Condominium_rateId_fkey" FOREIGN KEY ("rateId") REFERENCES "rate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
