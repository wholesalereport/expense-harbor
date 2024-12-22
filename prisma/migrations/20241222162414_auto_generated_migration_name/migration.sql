/*
  Warnings:

  - Made the column `reportId` on table `PaymentIntent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PaymentIntent" ALTER COLUMN "reportId" SET NOT NULL;
