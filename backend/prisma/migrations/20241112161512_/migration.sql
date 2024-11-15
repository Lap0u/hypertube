-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_movieId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "movieId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("imdbId") ON DELETE RESTRICT ON UPDATE CASCADE;
