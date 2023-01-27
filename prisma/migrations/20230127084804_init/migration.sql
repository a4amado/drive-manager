/*
  Warnings:

  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `VerificationToken` table. All the data in the column will be lost.
  - You are about to drop the `ToBeDeleted` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey",
DROP COLUMN "id";

-- DropTable
DROP TABLE "ToBeDeleted";
