-- CreateTable
CREATE TABLE "traits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "traits_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "traits" ADD CONSTRAINT "traits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
