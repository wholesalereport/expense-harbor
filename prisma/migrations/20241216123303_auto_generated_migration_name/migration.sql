/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `PaymentIntent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `PaymentIntent` table. All the data in the column will be lost.
  - The primary key for the `Report` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Report` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PaymentIntent" DROP CONSTRAINT "PaymentIntent_reportId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentIntent" DROP CONSTRAINT "PaymentIntent_userId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- AlterTable
ALTER TABLE "PaymentIntent" DROP COLUMN "paymentMethod",
DROP COLUMN "userId",
ADD COLUMN     "paymentMethodId" TEXT,
ALTER COLUMN "reportId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Report" DROP CONSTRAINT "Report_pkey",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET NOT NULL,
ADD CONSTRAINT "Report_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Report_id_seq";

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "PaymentIntent" ADD CONSTRAINT "PaymentIntent_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE CASCADE ON UPDATE CASCADE;
