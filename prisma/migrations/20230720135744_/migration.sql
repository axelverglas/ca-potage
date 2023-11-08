/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `location` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `slug` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sold" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
DROP COLUMN "location",
ADD COLUMN     "location" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");
