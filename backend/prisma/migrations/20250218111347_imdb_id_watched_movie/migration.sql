/*
  Warnings:

  - Added the required column `imdbId` to the `WatchedMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchedMovie" ADD COLUMN     "imdbId" TEXT NOT NULL;
