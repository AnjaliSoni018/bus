-- CreateTable
CREATE TABLE "public"."busOperator" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "travelsName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "businessBackground" TEXT NOT NULL,
    "businessBackgroundOther" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "pincode" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "alternateEmail" TEXT,
    "pan" TEXT NOT NULL,
    "isMSMERegistered" BOOLEAN NOT NULL DEFAULT false,
    "msmeNumber" TEXT,
    "cin" TEXT,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "busOperator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "busOperator_userId_key" ON "public"."busOperator"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "busOperator_pan_key" ON "public"."busOperator"("pan");

-- CreateIndex
CREATE UNIQUE INDEX "busOperator_msmeNumber_key" ON "public"."busOperator"("msmeNumber");

-- CreateIndex
CREATE UNIQUE INDEX "busOperator_cin_key" ON "public"."busOperator"("cin");

-- AddForeignKey
ALTER TABLE "public"."busOperator" ADD CONSTRAINT "busOperator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
