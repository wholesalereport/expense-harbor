/*
  Warnings:

  - Added the required column `tier` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTransactions` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "tier" TEXT NOT NULL,
ADD COLUMN     "totalTransactions" INTEGER NOT NULL;
