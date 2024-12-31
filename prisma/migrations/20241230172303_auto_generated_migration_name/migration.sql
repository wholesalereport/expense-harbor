/*
  Warnings:

  - You are about to alter the column `title` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(10)`.

*/
-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "title" SET DATA TYPE CHAR(10);
