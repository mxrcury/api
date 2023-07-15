/*
  Warnings:

  - You are about to drop the column `roleName` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleName_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleName",
ADD COLUMN     "role_name" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_name_fkey" FOREIGN KEY ("role_name") REFERENCES "Role"("name") ON DELETE SET NULL ON UPDATE CASCADE;
