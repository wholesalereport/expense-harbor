/*
  Warnings:

  - You are about to drop the column `status` on the `PaymentIntent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentIntent" DROP CONSTRAINT "PaymentIntent_userId_fkey";

-- AlterTable
ALTER TABLE "PaymentIntent" DROP COLUMN "status",
ALTER COLUMN "reportId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PaymentIntent" ADD CONSTRAINT "PaymentIntent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
