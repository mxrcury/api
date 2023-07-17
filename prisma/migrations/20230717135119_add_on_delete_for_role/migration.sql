-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_name_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_name_fkey" FOREIGN KEY ("role_name") REFERENCES "Role"("name") ON DELETE NO ACTION ON UPDATE CASCADE;
