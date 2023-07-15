/*
  Warnings:

  - Made the column `role_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_name_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role_name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_name_fkey" FOREIGN KEY ("role_name") REFERENCES "Role"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
