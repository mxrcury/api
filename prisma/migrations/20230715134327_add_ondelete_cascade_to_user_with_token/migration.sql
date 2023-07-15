-- DropForeignKey
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
