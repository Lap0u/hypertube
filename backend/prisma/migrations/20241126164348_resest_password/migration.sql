-- CreateTable
CREATE TABLE "RestPasswordToken" (
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiredAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RestPasswordToken_token_key" ON "RestPasswordToken"("token");

-- AddForeignKey
ALTER TABLE "RestPasswordToken" ADD CONSTRAINT "RestPasswordToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
