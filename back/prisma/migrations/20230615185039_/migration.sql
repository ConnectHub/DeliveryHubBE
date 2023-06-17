-- AlterTable
ALTER TABLE "Condominium" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Resident" ALTER COLUMN "deletedAt" DROP NOT NULL;
