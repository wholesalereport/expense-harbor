/*
  Warnings:

  - You are about to drop the column `title` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "title",
ADD COLUMN     "name" TEXT;