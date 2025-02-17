/*
  Warnings:

  - You are about to drop the column `imdbId` on the `Movie` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hash]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hash` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Movie_imdbId_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "imdbId",
ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_hash_key" ON "Movie"("hash");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("hash") ON DELETE RESTRICT ON UPDATE CASCADE;
