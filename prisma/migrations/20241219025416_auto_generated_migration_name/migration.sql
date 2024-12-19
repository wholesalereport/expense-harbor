/*
  Warnings:

  - You are about to drop the column `tierId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `totalTransactions` on the `Report` table. All the data in the column will be lost.
  - Added the required column `tier` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalLines` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Report` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "tierId",
DROP COLUMN "totalTransactions",
ADD COLUMN     "tier" TEXT NOT NULL,
ADD COLUMN     "totalLines" INTEGER NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
