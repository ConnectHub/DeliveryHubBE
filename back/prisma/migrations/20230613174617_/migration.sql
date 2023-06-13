/*
  Warnings:

  - Added the required column `addresseeId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addresseeId" TEXT NOT NULL,
ALTER COLUMN "sender" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addresseeId_fkey" FOREIGN KEY ("addresseeId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
