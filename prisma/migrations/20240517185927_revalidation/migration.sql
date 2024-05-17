/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
DROP COLUMN "profilePicture",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
