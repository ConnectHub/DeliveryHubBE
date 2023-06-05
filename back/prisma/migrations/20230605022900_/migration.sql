-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'DELIVERED', 'CANCELED');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "sender" TEXT NOT NULL,
    "doormanId" TEXT NOT NULL,
    "addresseeId" TEXT NOT NULL,
    "receiptDateHour" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resident" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "buildingApartment" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doorman" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Doorman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_url_key" ON "Order"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Order_code_key" ON "Order"("code");

-- CreateIndex
CREATE INDEX "Order_addresseeId_doormanId_idx" ON "Order"("addresseeId", "doormanId");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_id_key" ON "Resident"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_buildingApartment_key" ON "Resident"("buildingApartment");

-- CreateIndex
CREATE UNIQUE INDEX "Resident_email_key" ON "Resident"("email");

-- CreateIndex
CREATE INDEX "Resident_name_buildingApartment_idx" ON "Resident"("name", "buildingApartment");

-- CreateIndex
CREATE UNIQUE INDEX "Doorman_id_key" ON "Doorman"("id");

-- CreateIndex
CREATE INDEX "Doorman_name_idx" ON "Doorman"("name");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addresseeId_fkey" FOREIGN KEY ("addresseeId") REFERENCES "Resident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_doormanId_fkey" FOREIGN KEY ("doormanId") REFERENCES "Doorman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
