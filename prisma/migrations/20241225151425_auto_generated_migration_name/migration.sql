/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Report_id_userId_key" ON "Report"("id", "userId");
