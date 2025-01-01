/*
  Warnings:

  - You are about to drop the column `paymentAmount` on the `PaymentIntent` table. All the data in the column will be lost.
  - Added the required column `amount` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentIntent" DROP COLUMN "paymentAmount",
ADD COLUMN     "amount" INTEGER NOT NULL;
