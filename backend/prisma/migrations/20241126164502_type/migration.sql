/*
  Warnings:

  - You are about to drop the `RestPasswordToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RestPasswordToken" DROP CONSTRAINT "RestPasswordToken_userId_fkey";

-- DropTable
DROP TABLE "RestPasswordToken";

-- CreateTable
CREATE TABLE "ResetPasswordToken" (
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ResetPasswordToken_token_key" ON "ResetPasswordToken"("token");

-- AddForeignKey
ALTER TABLE "ResetPasswordToken" ADD CONSTRAINT "ResetPasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
