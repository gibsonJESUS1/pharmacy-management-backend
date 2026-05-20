/*
  Warnings:

  - You are about to drop the column `pharmacistNotes` on the `Prescription` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedAt` on the `Prescription` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Prescription` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `Prescription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_userId_fkey";

-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "pharmacistNotes",
DROP COLUMN "reviewedAt",
DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "reviewedBy" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
