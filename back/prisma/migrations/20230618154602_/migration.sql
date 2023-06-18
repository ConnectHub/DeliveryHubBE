/*
  Warnings:

  - Added the required column `orderId` to the `InboxMessageErrors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InboxMessageErrors" ADD COLUMN     "orderId" TEXT NOT NULL;
