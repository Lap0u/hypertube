/*
  Warnings:

  - You are about to drop the column `imdb_id` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imdbId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imdbId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "imdb_id",
ADD COLUMN     "imdbId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "lastName" SET DEFAULT '',
ALTER COLUMN "firstName" SET DEFAULT '',
ALTER COLUMN "preferredLanguage" SET DEFAULT '',
ALTER COLUMN "profilePictureUrl" SET DEFAULT '',
ALTER COLUMN "refreshToken" SET DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Movie_imdbId_key" ON "Movie"("imdbId");
