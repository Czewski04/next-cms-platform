/*
  Warnings:

  - The primary key for the `ProjectImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProjectImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `ProjectImage` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProjectImage" DROP CONSTRAINT "ProjectImage_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProjectImage_pkey" PRIMARY KEY ("url");

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectImage_url_key" ON "ProjectImage"("url");
